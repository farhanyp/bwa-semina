const {
    signupParticipant,
    activateParticipant,
    signinParticipant,
    getAllEvents,
    getOneEvent,
    getAllOrders,
    checkoutOrder,
    getAllPaymentByOrganizer,
  } = require('../../../services/mongoosee/participant');
const { StatusCodes } = require('http-status-codes');
const { bufferToBase64 } = require('../../../utils/base64');


const signup = async (req, res, next) => {
    try {
      const result = await signupParticipant(req);
  
      res.status(StatusCodes.CREATED).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
};

const signin = async (req, res, next) => {
    try {
      const result = await signinParticipant(req);
  
      res.status(StatusCodes.OK).json({
        data: { token: result },
      });
    } catch (err) {
      next(err);
    }
};

const activeParticipant = async (req, res, next) => {
    try {
      const result = await activateParticipant(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
};

const getAllLandingPage = async (req, res, next) => {
    try {
      const result = await getAllEvents(req);

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

  const getDetailLandingPage = async (req, res, next) => {
    try {
      const result = await getOneEvent(req);

      const resultCopy = JSON.parse(JSON.stringify(result)); 
        
      resultCopy.image.dataImage = bufferToBase64(result.image.dataImage);

      resultCopy.talent.image.dataImage = bufferToBase64(result.talent.image.dataImage);
  
      res.status(StatusCodes.OK).json({
        data: resultCopy,
      });
    } catch (err) {
      next(err);
    }
  };

  const checkout = async (req, res, next) => {
    try {
      const result = await checkoutOrder(req);
  
      res.status(StatusCodes.CREATED).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const getDashboard = async (req, res, next) => {
    try {
      const result = await getAllOrders(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  const getAllPayment = async (req, res, next) => {
    try {
      const result = await getAllPaymentByOrganizer(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    signup,
    activeParticipant,
    signin,
    getAllLandingPage,
    getDetailLandingPage,
    getDashboard,
    checkout,
    getAllPayment,
};