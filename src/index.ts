import { argv, env } from "bun";

const targetHost = env.PROXY_TARGET_HOST
const targetPort = env.PROXY_TARGET_PORT
const listenPort = parseInt(env.PROXY_LISTEN_PORT || "25565")

if (!targetHost) throw new Error("No target host specified in .env file (PROXY_TARGET_HOST)")
if (!targetPort) throw new Error("No target port specified in .env file (PROXY_TARGET_PORT)")
if (!listenPort) throw new Error("No listen port specified in .env file (PROXY_LISTEN_PORT)")

console.log(`Starting proxy server on port ${listenPort}, forwarding to ${targetHost}:${targetPort}`)

Bun.listen({
    port: listenPort,
    hostname: "localhost",
    socket: {
        open: async (socket: Bun.Socket<Promise<Bun.Socket>>) => {
            console.log("new connection");

            const connection = Bun.connect({
                hostname: targetHost,
                port: Number.parseInt(targetPort),
                socket: {
                    open: (targetSocket) => {
                        console.log("connected to target");
                    },
                    data: (targetSocket, data) => {
                        socket.write(data);
                    },
                    close: (targetSocket) => {
                        console.log("target closed connection");
                        socket.end();
                    },
                    error: (targetSocket, error) => {
                        console.error("Target socket error:", error);
                    }
                }
            })

            socket.data = connection
        },
        data: async (socket, data) => {
            const target = await socket.data;
            target.write(data);
        }
        ,
        close: async (socket) => {
            console.log("client closed connection");
            const target = await socket.data;
            target.end();
        },
        error: (socket, error) => {
            console.error("Socket error:", error);
        }
    }
})

console.log(argv.slice(2))

Bun.spawn({
    cmd: argv.slice(2),
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
    onExit: (_, code) => {
        process.exit(code)
    }
})