export const validateSchema = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body); // Aquí puedes cambiar a req.params o req.query si lo necesitas
      next();
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
  };