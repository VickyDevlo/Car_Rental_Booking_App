import Booking from "../models/Booking.js";
import Car from "../models/Cars.js";

// Function to check availability of car for given date
const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });

  return bookings.length === 0;
};

// API to check availability of cars for the given date and location
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    if (!location || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide location, pickupDate, and returnDate",
      });
    }

    const cars = await Car.find({ location, isAvailable: true });

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
      return { ...car._doc, isAvailable:isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car.isAvailable);

    res.json({
      success: true,
      availableCars,
    });
  } catch (error) {
    console.log("Error in checkAvailabilityOfCar:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to create booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Car is not available",
      });
    }

    const carData = await Car.findById(car);

    // calculate price base on pickup & return date
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    let noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));

    // Ensure at least 1 day
    noOfDays = noOfDays <= 0 ? 1 : noOfDays;

    const price = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    res.json({
      success: true,
      message: "Booking created",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to list user booking
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id }).populate("car").sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API for getting owner bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      res.json({
        success: false,
        message: "Not authorized",
      });
    }

    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to change booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);

    if (booking.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "Not authorized",
      });
    }

    booking.status = status;
    await booking.save();
    res.json({
      success: true,
      message: "Status updated",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
