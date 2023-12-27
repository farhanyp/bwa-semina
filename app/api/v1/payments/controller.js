const { StatusCodes } = require('http-status-codes');

const {
    getAllPayments,
    createPayments,
    getOnePayments,
    updatePayments,
    deletePayments,
  } = require('../../../services/mongoosee/payments');
const { bufferToBase64 } = require('../../../utils/base64');

  const create = async (req, res, next) => {
    try {
      const result = await createPayments(req);
  
      res.status(StatusCodes.CREATED).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  const index = async (req, res, next) => {
    try {
      const result = await getAllPayments(req);

      const resultCopy = JSON.parse(JSON.stringify(result));

      for (const data of resultCopy) {
        if (data && data.image.dataImage) {
          data.image.dataImage = bufferToBase64(data.image.dataImage);
        }
      }
  
      res.status(StatusCodes.OK).json({
        data: resultCopy,
      });
    } catch (err) {
      next(err);
    }
  };

  const find = async (req, res, next) => {
    try {
      const result = await getOnePayments(req);

      const resultCopy = JSON.parse(JSON.stringify(result)); 
        
      resultCopy.image.dataImage = bufferToBase64(result.image.dataImage);
  
      res.status(StatusCodes.OK).json({
        data: resultCopy,
      });
    } catch (err) {
      next(err);
    }
  };

  const update = async (req, res, next) => {
    try {
      const result = await updatePayments(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  const destroy = async (req, res, next) => {
    try {
      const result = await deletePayments(req);
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  module.exports = {
    index,
    find,
    update,
    destroy,
    create,
  };