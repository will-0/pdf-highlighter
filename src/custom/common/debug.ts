class PNDebug {
    // Debug mode on or off
    private static _active: boolean = false
    public static set active(active: boolean) { this._active = active }
    public static get active() { return this._active }

    // Set log level
    private static _loglevel: PNDebug.LogLevel
    static set loglevel(level: PNDebug.LogLevel) {
        if (!(this._active)) {console.log("LOG LEVEL SET BUT DEBUGGER NOT ACTIVE")}
        this._loglevel = level
        PNDebug.log("Log level set to " + level)
    }
    static get loglevel() { return this._loglevel }

    // Redirection of API calls in development mode
    static _redirect_api_calls: boolean
    static set redirect_api_calls(redirect: boolean) {
        if (!(this._active)) { 
            console.log("REDIRECTION NOT ENABLED AS DEBUGGER NOT ACTIVE GLOBALLY")
            this._redirect_api_calls = false
        } else {
            this._redirect_api_calls = redirect
            PNDebug.log("API redirection set to " + redirect)
        }
    }
    static get redirect_api_calls() { return this._redirect_api_calls }

    // Debug mode on or off
    private static _decouple_API: boolean = false
    public static set decouple_API(decouple: boolean) {
        if (!(this._active)) { 
            console.log("API DECOUPLING NOT ENABLED AS DEBUGGER NOT ACTIVE GLOBALLY")
            this._decouple_API = false
        } else {
            this._decouple_API = decouple
            if (this._decouple_API) {
                PNDebug.log("API DECOUPLING ACTIVATED. This is for debugging purposes only, as it removes core functionality of code. Change this setting in at src/components/common/debug.ts", PNDebug.LogLevel.Warning)
            }
        }
    }
    public static get decouple_API() { return this._decouple_API }

    // Redirect linkpage to localhost
    private static _redirect_linkpage: boolean = false
    public static set redirect_linkpage(redirect: boolean) {
        if (!(this._active)) { 
            console.log("LINKPAGE REDIRECTING NOT ENABLED AS DEBUGGER NOT ACTIVE GLOBALLY")
            this._redirect_linkpage = false
        } else {
            this._redirect_linkpage = redirect
            if (this._redirect_linkpage) {
                PNDebug.log("LINKPAGE REDIRECTING ACTIVATED. This is for debugging purposes only, as it removes core functionality of code. Change this setting in at src/components/common/debug.ts", PNDebug.LogLevel.Warning)
            }
        }
    }
    public static get redirect_linkpage() { return this._redirect_linkpage }

    private static _reathorize_every_time: boolean = false
    public static set reathorize_every_time(reathorize: boolean) {
        if (!(this._active)) {
            console.log("REATHORIZATION NOT ENABLED AS DEBUGGER NOT ACTIVE GLOBALLY")
            this._reathorize_every_time = false
        } else {
            this._reathorize_every_time = reathorize
            if (this._reathorize_every_time) {
                PNDebug.log("REATHORIZATION ACTIVATED. This is for debugging purposes only, as it forces user to sign in each time. Change this setting in at src/components/common/debug.ts", PNDebug.LogLevel.Warning)
            }
        }
    }
    public static get reathorize_every_time() { return this._reathorize_every_time }

    // Logging module
    static log(msg: string, level: PNDebug.LogLevel=PNDebug.LogLevel.Debug) {
        if (!(this._active)) {return null}
        if (level <= this._loglevel) {
            switch (level) {
                case PNDebug.LogLevel.Error:
                    console.info("Synapcard ERROR: " + msg)
                    break;
                case PNDebug.LogLevel.Warning:
                    console.info("Synapcard  WARNING: " + msg)
                    break;
                case PNDebug.LogLevel.Info:
                    console.info("Synapcard Info Msg: " + msg)
                    break;
                case PNDebug.LogLevel.Debug:
                    console.log("Synapcard Debug Msg: " + msg)
                    break;
                case PNDebug.LogLevel.Verbose:
                    console.log("Synapcard Verbose Msg: " + msg)
                    break;
                default:
                    console.log("Synapcard Default Msg: " + msg)
                    break;
            } 
        }
    }
}

namespace PNDebug {
    export enum LogLevel {
        None = 0,
        Error = 1,
        Warning = 2,
        Info = 3,
        Debug = 4,
        Verbose = 5
    }
}

// DEFAULT SETTINGS`
PNDebug.active = true
PNDebug.loglevel = PNDebug.LogLevel.Verbose
PNDebug.redirect_api_calls = false
PNDebug.decouple_API = false
PNDebug.reathorize_every_time = false
PNDebug.redirect_linkpage = false

export default PNDebug