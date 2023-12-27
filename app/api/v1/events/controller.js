const { createEvents, getAllEvents, getOneEvents, updateEvents, deleteEvents, changeStatusEvents } = require('../../../services/mongoosee/events')
const { StatusCodes } = require('http-status-codes')
const { bufferToBase64 } = require('../../../utils/base64')

const create = async ( req, res, next) => {
    try {
        const result = await createEvents(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const index = async ( req, res, next) => {
    try {
        const result = await getAllEvents(req)

        const resultCopy = JSON.parse(JSON.stringify(result));

        for (const data of resultCopy) {
        if (data && data.image.dataImage) {
            data.image.dataImage = bufferToBase64(data.image.dataImage);
        }
        
        if(data && data.talent.image.dataImage){
            data.talent.image.dataImage = bufferToBase64(data.talent.image.dataImage);
        }
        }

        res.status(StatusCodes.OK).json({
            data: resultCopy
        })
    } catch (error) {
        next(error)
    }
}

const find = async ( req, res, next) => {
    try {
        const result = await getOneEvents(req)

        const resultCopy = JSON.parse(JSON.stringify(result)); 
        
        resultCopy.image.dataImage = bufferToBase64(result.image.dataImage);

        resultCopy.talent.image.dataImage = bufferToBase64(result.talent.image.dataImage);

        res.status(StatusCodes.OK).json({
            data: resultCopy
        })
    } catch (error) {
        next(error)
    }
}

const update = async ( req, res, next) => {
    try {
        const result = await updateEvents(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async ( req, res, next) => {
    try {
        const result = await deleteEvents(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const changeStatus = async (req, res, next) => {
    try {
      const result = await changeStatusEvents(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

module.exports={
    create,
    index,
    find,
    update,
    destroy,
    changeStatus
}