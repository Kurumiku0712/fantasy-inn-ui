import axios from "axios"

export default class ApiService {

    static BASE_URL = "http://localhost:4040"

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTH */

    /* This  register a new user */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data
    }

    /* This  login a registered user */
    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    /***USERS */


    /*  This is  to get the user profile */
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is the  to get a single user */
    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    /* This is the  to get user bookings by the user id */
    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is to delete a user */
    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    /**house */
    /* This  adds a new house house to the database */
    static async addHouse(formData) {
        const result = await axios.post(`${this.BASE_URL}/houses/add`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }

    /* This  gets all available houses */
    static async getAllAvailableHouses() {
        const result = await axios.get(`${this.BASE_URL}/houses/all-available-houses`)
        return result.data
    }


    /* This  gets all available by dates houses from the database with a given date and a house type */
    static async getAvailableHousesByDateAndType(checkInDate, checkOutDate, houseType) {
        const result = await axios.get(
            `${this.BASE_URL}/houses/available-houses-by-date-and-type?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&houseType=${houseType}`
        )
        return result.data
    }

    /* This  gets all house types from thee database */
    static async getHouseTypes() {
        const response = await axios.get(`${this.BASE_URL}/houses/types`)
        return response.data
    }
    /* This  gets all houses from the database */
    static async getAllHouses() {
        const result = await axios.get(`${this.BASE_URL}/houses/all`)
        return result.data
    }
    /* This function gets a house by the id */
    static async getHouseById(houseId) {
        const result = await axios.get(`${this.BASE_URL}/houses/house-by-id/${houseId}`)
        return result.data
    }

    /* This  deletes a house by the Id */
    static async deleteHouse(houseId) {
        const result = await axios.delete(`${this.BASE_URL}/houses/delete/${houseId}`, {
            headers: this.getHeader()
        })
        return result.data
    }

    /* This updates a house */
    static async updateHouse(houseId, formData) {
        const result = await axios.put(`${this.BASE_URL}/houses/update/${houseId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }


    /**BOOKING */
    /* This  saves a new booking to the database */
    static async bookHouse(houseId, userId, booking) {

        console.log("USER ID IS: " + userId)

        const response = await axios.post(`${this.BASE_URL}/bookings/book-house/${houseId}/${userId}`, booking, {
            headers: this.getHeader()
        })
        return response.data
    }

    /* This  gets all bookings from the database */
    static async getAllBookings() {
        const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader()
        })
        return result.data
    }

    /* This  get booking by the confirmation code */
    static async getBookingByConfirmationCode(bookingCode) {
        const result = await axios.get(`${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`)
        return result.data
    }

    /* This is the  to cancel user booking */
    static async cancelBooking(bookingId) {
        const result = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: this.getHeader()
        })
        return result.data
    }


    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    // 获取所有电影
    static async getAllMovies() {
        const response = await axios.get(`${this.BASE_URL}/api/movies`);
        return response.data;
    }

    // 根据 ID 获取电影详情
    static async getMovieById(movieId) {
        const response = await axios.get(`${this.BASE_URL}/api/movies/${movieId}`);
        return response.data;
    }


}

// export default new ApiService();