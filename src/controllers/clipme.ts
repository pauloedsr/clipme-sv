import { default as Clip, ClipModel } from "../models/Clip";
import { Request, Response, NextFunction } from "express";

/**
 * Cria
 */
export let create = (req: Request, res: Response, next: NextFunction) => {
  req.assert("timeline", "Timeline não informada").notEmpty();
  req.assert("autor", "Autor é necessário").notEmpty();
  // req.assert("clip", "Não é um base 64 válido").isBase64();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.json({success: false, errors : errors});
  }

  const clip = new Clip(req.body);
  clip.save((err) => {
    if (err) { return next(err); }
    res.json({success: true, obj: clip});
  });
};

/**
 * Atualiza
 */
export let update = (req: Request, res: Response, next: NextFunction) => {
  req.assert("clip", "Não é um base 64 válido").isBase64();
  req.assert("id", "ID é necessário").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.json({success: false, errors : errors});
  }

  Clip.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err, obj) => {
    if (err) return next(err);
    res.json({success: true, obj: obj});
  });
};

/**
 * Remove
 */
export let remove = (req: Request, res: Response, next: NextFunction) => {
  req.assert("id", "ID é necessário").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.json({success: false, errors : errors});
  }

  Clip.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    res.json({success: true});
  });
};