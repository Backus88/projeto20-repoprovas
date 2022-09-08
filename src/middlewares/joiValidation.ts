import {Request, Response, NextFunction} from 'express';



const joiValidation = (schema: any)=>{
	return (req: Request, res: Response, next: NextFunction)=>{
		const validation = schema.validate(req.body);
		if (validation.error) {
			return res.status(422).send(validation.error.details.map((detail:any) => detail.message));
		}
		next();
	};
};
  
export default joiValidation;