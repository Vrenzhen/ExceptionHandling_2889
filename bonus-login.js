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
        super(message || "Terjadi kesalahan sistem yang tidak terduga");
        this.name = "SystemError_2889";
    }
}

class AuthService_2889 {
    static validateInput_2889(username, password) {
        if (!username || !password) {
            throw new ValidationError_2889("Username dan password tidak boleh kosong");
        }
        if (typeof username !== 'string' || typeof password !== 'string') {
             throw new ValidationError_2889("Input harus berupa string");
        }
        if (username.length < 4) {
            throw new ValidationError_2889("Username terlalu pendek (min 4 karakter)");
        }
        if (password.length < 6) {
            throw new ValidationError_2889("Password terlalu pendek (min 6 karakter)");
        }
    }

    static async login_2889(username, password) {
        try {
            this.validateInput_2889(username, password);

            return await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === "Vrenzhen" && password === "Vrenzhen2889") {
                        resolve("Login berhasil -> selamat datang Vrenzhen");
                    } else if (username === "Vrenzhen") {
                        reject(new AuthError_2889("Password salah"));
                    } else {
                        reject(new AuthError_2889("Username tidak terdaftar"));
                    }
                }, 500);
            });

        } catch (error) {
            if (error instanceof ValidationError_2889 || error instanceof AuthError_2889) {
                throw error;
            } else {
                throw new SystemError_2889(error.message);
            }
        } finally {
            console.log("[System] Proses login selesai (finally block executed)");
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptLogin() {
    console.log("\n--- SISTEM LOGIN 2889 ---");
    rl.question("Username: ", (username) => {
        rl.question("Password: ", async (password) => {
            
            try {
                const message = await AuthService_2889.login_2889(username, password);
                console.log("\nSUKSES: " + message);
                rl.close(); 
            } catch (error) {
                console.log("\nERROR TERJADI:");
                
                if (error instanceof ValidationError_2889) {
                    console.error(`[Validasi]: ${error.message}`);
                } else if (error instanceof AuthError_2889) {
                    console.error(`[Otentikasi]: ${error.message}`);
                } else if (error instanceof SystemError_2889) {
                    console.error(`[Sistem]: ${error.message}`);
                } else {
                    console.error(`[Unknown]: ${error.message}`);
                }

                console.log("\nSilakan coba lagi...");
                promptLogin();
            }
        });
    });
}

promptLogin();
