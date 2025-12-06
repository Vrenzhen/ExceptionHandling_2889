const readline = require('readline');

class LoginError_2889 extends Error {
    constructor(message) {
        super(message);
        this.name = "LoginError_2889";
    }
}

class ValidationError_2889 extends LoginError_2889 {
    constructor(message) {
        super(message);
        this.name = "ValidationError_2889";
    }
}

class AuthError_2889 extends LoginError_2889 {
    constructor(message) {
        super(message);
        this.name = "AuthError_2889";
    }
}

class SystemError_2889 extends LoginError_2889 {
    constructor(message) {
        super(message);
        this.name = "SystemError_2889";
    }
}

class LoginSystem_2889 {

    static validateInput_2889(username, password) {
        if (!username || !password) {
            throw new ValidationError_2889("Input kosong: Username dan password wajib diisi!");
        }
        if (username.length < 4) {
            throw new ValidationError_2889("Username terlalu pendek (min. 4 karakter).");
        }
        if (password.length < 6) {
            throw new ValidationError_2889("Password terlalu pendek (min. 6 karakter).");
        }
    }

    static authenticate_2889(username, password) {
        const validUser = "admin2889";
        const validPass = "password2889";

        if (username === "crash") {
            throw new Error("Database connection failed unexpectedly");
        }

        if (username !== validUser) {
            throw new AuthError_2889("Username tidak terdaftar dalam sistem.");
        }

        if (password !== validPass) {
            throw new AuthError_2889("Password salah!");
        }

        return "Login berhasil! Selamat datang, " + username;
    }

    static async startLoginSession_2889() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const ask = (q) => new Promise(resolve => rl.question(q, resolve));

        console.log("\n=== SYSTEM LOGIN (NPM 2889) ===");
        console.log("Hint: User='admin2889', Pass='password2889'\n");

        try {
            const username = await ask("Masukkan Username: ");
            const password = await ask("Masukkan Password: ");

            try {
                this.validateInput_2889(username, password);

                const result = this.authenticate_2889(username, password);

                console.log(`\n[SUCCESS] ${result}`);

            } catch (innerError) {
                if (innerError instanceof ValidationError_2889) {
                    console.log(`\n[VALIDATION FAILED] ${innerError.message}`);
                } else if (innerError instanceof AuthError_2889) {
                    console.log(`\n[AUTH FAILED] ${innerError.message}`);
                } else {
                    throw new SystemError_2889(`Terjadi kesalahan sistem: ${innerError.message}`);
                }
            }

        } catch (fatalError) {
            console.log(`\n[SYSTEM ERROR] ${fatalError.message}`);
        } finally {
            console.log("\n--- Sesi Login Ditutup (Finally Block) ---");
            rl.close();
        }
    }
}

LoginSystem_2889.startLoginSession_2889();
