


// It's a wrapper to handle errors in async Express route handlers
//  so you don’t need to write try/catch in every controller.

// const asyncHandler=(func)=async(req,res,next)=>{
//      try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             message:error.message,
//             success:false
//         })
//     }
// }

const asyncHandler=(requestHandler)=>{
   return (req,res,next)=>{
     Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))   
    }
}
export {asyncHandler}