import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, await params, "GET");
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, await params, "POST");
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, await params, "PUT");
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, await params, "DELETE");
}

async function handleRequest(request: NextRequest, params: { path: string[] }, method: string) {
    try {
        const path = params.path.join("/");
        const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

        // Construct the backend URL
        // We assume the path segments after /api/proxy map directly to backend endpoints
        // e.g. /api/proxy/read-barcode -> http://localhost:8000/api/read-barcode
        // e.g. /api/proxy/student-profile/123 -> http://localhost:8000/api/student-profile/123

        // Ensure we don't double slash if path starts with api/
        // The backend endpoints seem to start with /api/ or just /update-profile in some cases
        // Let's assume the user calls /api/proxy/<endpoint> and we append <endpoint> to backend url

        const url = `${pythonBackendUrl}/${path}${request.nextUrl.search}`;

        // Logging handled by Next.js server logs

        const headers = new Headers(request.headers);
        headers.delete("host");
        headers.delete("connection");
        headers.delete("content-length");

        // Prepare fetch options
        const options: RequestInit = {
            method,
            headers: {
                "Content-Type": headers.get("Content-Type") || "application/json",
            },
        };

        if (method !== "GET" && method !== "HEAD") {
            // Forward body
            const contentType = headers.get("content-type");
            if (contentType && contentType.includes("multipart/form-data")) {
                // For file uploads, we might need to handle differently or just pass formData
                // But Next.js Request body handling can be tricky with streaming
                // For now, let's try to read as blob/buffer if possible, or just text/json
                try {
                    const blob = await request.blob();
                    options.body = blob;
                } catch (e) {
                    console.error("Failed to read request body", e);
                }
            } else {
                try {
                    const text = await request.text();
                    options.body = text;
                } catch (e) {
                    console.error("Failed to read request body", e);
                }
            }
        }


        // Add timeout - longer for barcode processing
        const controller = new AbortController();
        const timeoutMs = path.includes('read-barcode') ? 60000 : 30000; // 60s for barcode, 30s for others
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        options.signal = controller.signal;

        try {
            const response = await fetch(url, options);
            clearTimeout(timeoutId);

            // Forward response back to client
            const responseBody = await response.blob();

            const responseHeaders = new Headers(response.headers);
            // Clean up headers if needed

            return new NextResponse(responseBody, {
                status: response.status,
                statusText: response.statusText,
                headers: responseHeaders
            });

        } catch (fetchError: unknown) {
            clearTimeout(timeoutId);
            console.error(`Proxy error for ${path}:`, fetchError);

            let errorMessage = "Failed to connect to backend";
            let status = 502;

            if (fetchError instanceof Error) {
                if (fetchError.name === "AbortError") {
                    errorMessage = "Request timeout";
                    status = 504;
                } else if ('code' in fetchError && fetchError.code === "ECONNREFUSED") {
                    errorMessage = "Backend service unavailable";
                    status = 503;
                }
            }

            return NextResponse.json(
                { error: errorMessage, success: false, details: fetchError instanceof Error ? fetchError.message : String(fetchError) },
                { status }
            );
        }

    } catch (error: unknown) {
        console.error("Proxy internal error:", error);
        return NextResponse.json(
            { error: "Internal server error", success: false, details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
