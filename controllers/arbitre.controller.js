import { Referee, Match, Assignment} from '../models/index';

export const getAllReferees  = async (req,  res,  next) => {
    try {
        const referees = await Referee.findAll();
    } catch (error) {
        
    }
}