class InvalidSeatFormatError_2889 extends Error {
    constructor(seat, message) {
        super(message);
        this.name = "InvalidSeatFormatError_2889";
        this.seat = seat;
    }
}

class RowNotExistError_2889 extends Error {
    constructor(row, message) {
        super(message);
        this.name = "RowNotExistError_2889";
        this.row = row;
    }
}

class SeatManager_2889 {
    static parseSeat_2889(seat) {
        const regex = /^[A-J]\d+$/;
        
        if (!regex.test(seat)) {
            throw new InvalidSeatFormatError_2889(seat, `Format kursi ${seat} tidak valid. Gunakan huruf+nomer (contoh: A12)`);
        }
    }

    static async loadLayout_2889(row) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (row > "J") { 
                    reject(new RowNotExistError_2889(row, `Baris ${row} tidak ditemukan di layout`));
                } else {
                    resolve(true);
                }
            }, 100);
        });
    }

    static async reserveSeat_2889(seat) {
        try {
            this.parseSeat_2889(seat);

            const row = seat.charAt(0);

            await this.loadLayout_2889(row);

            console.log(`Kursi ${seat} berhasil di-reserve`);

        } catch (error) {
            if (error instanceof InvalidSeatFormatError_2889) {
                console.log(`Gagal reserve: ${error.message}`);
            } else if (error instanceof RowNotExistError_2889) {
                 console.log(`Gagal reserve: ${error.message}`);
            }
            throw error; 

        } finally {
            console.log("Release seat lock");
        }
    }
}

async function testSeatManager_2889() {
    const testCases = [
        "A12",
        "K5",
        "Z99",
        "B10",
        "A1"
    ];

    for (const seat of testCases) {
        try {
            await SeatManager_2889.reserveSeat_2889(seat);
        } catch (error) {
            if (error instanceof InvalidSeatFormatError_2889) {
                console.log(`Format salah: ${error.seat}`);
            } else if (error instanceof RowNotExistError_2889) {
                 console.log(`Baris tidak ada: ${error.row}`);
            }
        }
    }
}

testSeatManager_2889();
