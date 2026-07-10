import { z } from 'zod';

const refereeSchema = z.object({
  firstName: z.string().trim().min(1, 'firstName is required'),
  lastName: z.string().trim().min(1, 'lastName is required'),
  nationality: z.string().trim().min(1, 'nationality is required'),
  confederation: z.enum(['UEFA', 'CONMEBOL', 'CAF', 'AFC', 'CONCACAF', 'OFC']),
  category: z.enum(['Referee', 'Assistant', 'Fourth official', 'VAR', 'AVAR']),
  experience: z.number().int().min(0).optional(),
  status: z.enum(['active', 'suspended', 'injured', 'retired']).optional(),
});

const matchSchema = z.object({
  homeTeam: z.string().trim().min(1, 'homeTeam is required'),
  awayTeam: z.string().trim().min(1, 'awayTeam is required'),
  stadium: z.string().trim().min(1, 'stadium is required'),
  hostCity: z.string().trim().min(1, 'hostCity is required'),
  matchDate: z.string().min(1, 'matchDate is required'),
  phase: z.enum(['Group stage', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final']),
});

const assignmentSchema = z.object({
  refereeId: z.number().int().positive('refereeId must be a positive integer'),
  matchId: z.number().int().positive('matchId must be a positive integer'),
  role: z.enum(['central', 'assistant', 'VAR', 'AVAR', 'fourth official']),
});

const authSchema = z.object({
  username: z.string().trim().min(1, 'username is required').optional(),
  email: z.string().trim().email('email must be a valid email'),
  password: z.string().min(6, 'password must be at least 6 characters'),
});

const validateSchema = (schema, req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error.issues.map((issue) => issue.message),
    });
  }

  req.body = result.data;
  next();
};

export const validateReferee = (req, res, next) => validateSchema(refereeSchema, req, res, next);

export const validateMatch = (req, res, next) => validateSchema(matchSchema, req, res, next);

export const validateAssignment = (req, res, next) => validateSchema(assignmentSchema, req, res, next);

export const validateAuth = (req, res, next) => {
  const schema = req.path === '/register'
    ? authSchema.extend({ username: z.string().trim().min(1, 'username is required') })
    : authSchema.omit({ username: true });

  return validateSchema(schema, req, res, next);
};