class SeatNotAvailableError_2889 extends Error {
    constructor(seat, message) {
        super(message);
        this.name = "SeatNotAvailableError_2889";
        this.seat = seat;
    }
}

class PaymentFailedError_2889 extends Error {
    constructor(reason, message) {
        super(message);
        this.name = "PaymentFailedError_2889";
        this.reason = reason;
    }
}

class BookingService_2889 {
    static validateAge_2889(age, movieRating) {
        if (age < 17 && movieRating === "R") {
            throw new SeatNotAvailableError_2889(null, `Umur ${age} tahun tidak boleh nonton film R`);
        }
    }

    static checkSeatAvailability_2889(seatNumber) {
        return new Promise((resolve, reject) => {
            const bookedSeats = ["A1", "A2", "A3", "A4", "A5"];
            setTimeout(() => {
                if (bookedSeats.includes(seatNumber)) {
                    reject(new SeatNotAvailableError_2889(seatNumber, `${seatNumber}`));
                } else {
                    resolve(true);
                }
            }, 100);
        });
    }

    static async processPayment_2889(amount) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (amount < 50000) {
                    reject(new PaymentFailedError_2889("Saldo kurang", `Saldo tidak mencukupi (min. Rp50.000)`));
                } else {
                    resolve(true);
                }
            }, 100);
        });
    }

    static async bookTicket_2889(name, age, seat, movieRating, amount) {
        try {
            this.validateAge_2889(age, movieRating);
            await this.checkSeatAvailability_2889(seat);
            await this.processPayment_2889(amount);
            return {
                name: name,
                seat: seat,
                movieRating: movieRating,
                status: 'Tiket berhasil dipesan'
            };

        } catch (error) {
            throw error;
        } finally {
            console.log("Cleanup booking session");
        }
    }
}

async function testBooking_2889() {
    const tests = [
        { name: "Budi", age: 15, seat: "A3", rating: "R" },
        { name: "Andi", age: 20, seat: "A1", rating: "SU" },
        { name: "Cici", age: 25, seat: "B7", rating: "SU", amount: 30000 },
        { name: "Dedi", age: 22, seat: "C5", rating: "SU", amount: 75000 }
    ];

    for (const test of tests) {
        try {
            const ticket = await BookingService_2889.bookTicket_2889(
                test.name, 
                test.age, 
                test.seat, 
                test.rating, 
                test.amount
            );
            console.log("Berhasil:", ticket);

        } catch (error) {
            if (error instanceof SeatNotAvailableError_2889) {
                console.log(`Kursi/Umur tidak tersedia: ${error.message}`);
            } else if (error instanceof PaymentFailedError_2889) {
                console.log(`Pembayaran gagal: Pembayaran gagal: ${error.message}`);
            } else {
                console.log("Error tak terduga:", error.message);
            }
        }
    }
}

testBooking_2889();
