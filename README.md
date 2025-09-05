# AxiomProxy

Why? Axiom does not require the commercial license on localhost ips.


## Features
- Simple setup and configuration
- Seamless integration with Prism Launcher
- Easily customizable via environment variables

## Prerequisites
- Minecraft (any version supported by Prism Launcher)
- [Prism Launcher](https://prismlauncher.org/)
- Windows OS (for the provided executable)

## Installation & Usage
1. **Download** `proxy.exe` from the [Releases](https://github.com/CoreByte/AxiomProxy/releases) page.
2. **Download** `.env.example` from the repository and rename it to `.env`.
3. **Move** both `proxy.exe` and `.env` into your Minecraft game folder (the same folder as your instance).
4. **Open** Prism Launcher and go to your instance settings.
5. **Set** the wrapper command to:
   ```sh
   $INST_MC_DIR/proxy.exe
   ```
6. **Change** the server IP in your Minecraft client to `localhost`.
7. **Start** the game from Prism Launcher. The proxy will launch automatically.
8. **Profit!**

## Configuration
Edit the `.env` file to customize proxy settings as needed. Refer to comments in the `.env.example` for available options.

## Support
For issues or questions, please open an issue on the [GitHub repository](https://github.com/CoreByte/AxiomProxy/issues).

---