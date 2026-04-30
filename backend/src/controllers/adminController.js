const serviceModel = require("../models/serviceModel");
const jwt = require("jsonwebtoken");
const uploadFile = require("../config/image.service")


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required",
            });
        }

        // correct comparison
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                success: false,
                msg: "Invalid Credentials",
            });
        }

        // token generate
        const token = jwt.sign(
            { role: "admin" },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Server Error",
        });
    }
};

const addService = async (req, res) => {
    try {
        const { name, description, price, duration, topService } = req.body;

        if (!name || !price || !duration) {
            return res.status(400).json({
                success: false,
                msg: "Name, price and duration are required",
            });
        }

        if (!req.file) {
            return res.status(400).json({ msg: "Image is required" });
        }


        const existing = await serviceModel.findOne({
            name: name.toLowerCase(),
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                msg: "Service already exists",
            });
        }

        // Upload image
        const imageUrl = await uploadFile(req.file.buffer);

        const service = await serviceModel.create({
            name: name.toLowerCase(),
            description,
            price,
            duration,
            topService,
            image: imageUrl.url || null
        });

        res.status(201).json({
            success: true,
            msg: "Service Created Successfully",
            service,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Server Error",
        });
    }
};

const toggleServiceStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await serviceModel.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                msg: "Service not found",
            });
        }

        service.isActive = !service.isActive;

        await service.save();

        res.status(200).json({
            success: true,
            msg: "Service status updated",
            service,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Server Error",
        });
    }
};

const getService = async (req, res) => {
    try {

        const service = await serviceModel.find({})
        res.status(200).json({
            success: true,
            msg: "Services fetched successfully",
            count: service.length,
            service,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Server Error",
        });
    }
}

const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await serviceModel.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                msg: "Service not found",
            });
        }

        await serviceModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: "Service permanently deleted",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Server Error",
        });
    }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration } = req.body;

    const service = await serviceModel.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        msg: "Service not found",
      });
    }

    // Check duplicate name 
    if (name && name.toLowerCase() !== service.name) {
      const existing = await serviceModel.findOne({
        name: name.toLowerCase(),
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          msg: "Service with this name already exists",
        });
      }

      service.name = name.toLowerCase().trim();
    }

    // Update fields only if provided
    if (description !== undefined) service.description = description;
    if (price !== undefined) service.price = price;
    if (duration !== undefined) service.duration = duration;

    //  If new image uploaded
    if (req.file) {
      const imageUrl = await uploadFile(req.file.buffer);
      service.image = imageUrl.url;
    }

    await service.save();

    res.status(200).json({
      success: true,
      msg: "Service updated successfully",
      service,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

module.exports = { adminLogin, addService, toggleServiceStatus, getService, deleteService, updateService }
