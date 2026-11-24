import {Router} from "express"
// import * as authControllers from "../controllers/auth.controller.js"
import {register,login} from "../controllers/auth.controller.js"

const router = Router();

/**
 * @method Post 
 * @route /api/auth/register 
 */

router.post("/register",register)
router.post("/login",login)

export default router ;