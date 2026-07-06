import Referee from "../models/arbitre.model.js"


export const createReferee = async (req, res) => {
  try {
    const { name, email, experience, country } = req.body;

    
    if (!name || !email) {
      return res.status(400).json({ 
        error: 'Name and email are required' 
      });
    }

    const referee = await Referee.create({
      name,
      email,
      experience,
      country,
    });

    res.status(201).json({
      message: 'Referee created successfully',
      data: referee,
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
};

export const getAllReferees  = async (req,  res) => {
    try {
        const referees = await Referee.findAll();
        res.status(200).json(referees)
    } catch (error) {
        res.status(500).json({error : "server error"})
    }
}

export const getById = async(req, res) => {
    try{
        const {id} = req.params.id;
        if(!id) return res.status(404).json("data not found")
        const data = await Referee.findByPk(id);
        if(!data) return res.status(404).json("data not found")
    }catch(error){

    }
}

export const updateRefree = async (req , res) => {
    try {
        const { id } = req.params;
        const  referee = await Referee.findByPk(id);
         if (!referee) {
      return res.status(404).json({ 
        error: 'Referee not found' 
      });
    }
    await referee.update(req.body)
    } catch (error) {
        res.status(500).json({error : "server error"});
    }
}

export const deleteReferee = async (req,  res) =>{
    try {
        const { id } = req.params ;
        const referee = await Referee.findByPk(id);

        if (!referee) {
            return res.status(404).json({ error:'Referee not found'});
        }
        await referee.destroy();

        res.status(200).json({
            message: 'Referee deleted successfully'
            
        });
        
    } catch (error) {
        res.status(500).json({error:'server error'});
        
    };
}