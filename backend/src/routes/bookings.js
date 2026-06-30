import express from "express";
import Booking from "../models/Booking.js";
import { verifyToken } from "./auth.js";

const router = express.Router();

// Generate unique booking code
const generateBookingCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "BL-"; // Bidan Lila
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// GET all bookings (Admin)
router.get("/", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [["createdAt", "DESC"]] });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data pemesanan", error: err.message });
  }
});

// POST register new booking (Public)
router.post("/", async (req, res) => {
  const { name, phone, address, serviceName, date, time, notes } = req.body;
  if (!name || !phone || !address || !serviceName || !date || !time) {
    return res.status(400).json({ message: "Semua field utama wajib diisi" });
  }

  try {
    const bookingCode = req.body.bookingCode || generateBookingCode();
    const newBooking = await Booking.create({
      bookingCode,
      name,
      phone,
      address,
      serviceName,
      date,
      time,
      notes: notes || "",
      status: "Pending",
    });

    res.status(201).json({
      message: "Pemesanan berhasil disimpan",
      booking: newBooking,
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal memproses pemesanan", error: err.message });
  }
});

// PUT update booking status (Admin)
router.put("/:id/status", verifyToken, async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "Status wajib disertakan" });
  }

  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Data pemesanan tidak ditemukan" });
    }

    booking.status = status;
    await booking.save();
    res.json({ message: "Status pemesanan berhasil diperbarui", booking });
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui status pemesanan", error: err.message });
  }
});

// DELETE booking (Admin)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Data pemesanan tidak ditemukan" });
    }
    await booking.destroy();
    res.json({ message: "Pemesanan berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus pemesanan", error: err.message });
  }
});

export default router;
