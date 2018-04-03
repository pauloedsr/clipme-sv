import { default as Clip, ClipModel } from "../models/Clip";
import { Request, Response, NextFunction } from "express";

/**
 * GET /
 * Home page.
 */
export let clipme = (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    title: "Homed"
  });
};


export let paste = (req: Request, res: Response, next: NextFunction) => {
  req.assert("clip", "Não é um base 64 válido").isBase64();

  console.log(req.body);
  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.json({success: false, errors : errors});
  }

  const clip = new Clip({
    idUser: req.body.idUser,
    clip: req.body.clip
  });

    clip.save((err) => {
      if (err) { return next(err); }
      res.json({success: true});
  });
};