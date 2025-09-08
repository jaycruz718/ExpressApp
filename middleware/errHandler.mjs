export function errHandler(err, req, res, next) {
    console.log("Error:", err.message);

    res.status(err.status || 500).json({
      error: {
        message: err.message || "Internal Server Error"
      }
    });
}