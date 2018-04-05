import { default as Timeline, TimelineModel } from "../models/Timeline";
import { default as Clip, ClipModel } from "../models/Clip";
import { Request, Response, NextFunction } from "express";


export let create = (req: Request, res: Response, next: NextFunction) => {
  req.assert("autor", "Autor é necessário").notEmpty();
  const errors = req.validationErrors();

  if (errors) {
    return res.json({success: false, errors : errors});
  }

  const model = new Timeline(req.body);
  model.save((err) => {
    if (err) { return next(err); }
    res.json({success: true, obj: model});
  });
};

/**
 * Lista as timelines de acordo com autor
 */
export let list = (req: Request, res: Response, next: NextFunction) => {
  Timeline.find({autor : req.params.autor}, (err, timelines) => {
    if (err) { return next(err); }
    if (timelines)
      return res.json(timelines);
    else
      return res.json({success: false});
  });
};

export let view = (req: Request, res: Response, next: NextFunction) => {
  req.assert("id", "ID é necessário").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.json({success: false, errors : errors});
  }

  const id = req.params.id;
  let timeline: TimelineModel;
  let clips: ClipModel[];
  Timeline.findById(id, (err, data) => {
    if (err) { return next(err); }
    if (data)
      timeline = data;
    else
      return res.json({success: false});
  }).then(() => {
    Clip.find({timeline: id}, (err, data) => {
      clips = data;
    }).then(() => {
      return res.json({timeline: timeline, clips: clips});
    });
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

  Clip.remove({timeline : req.params.id}, (err) => {
    if (err) return next(err);
  }).then(() => {
    Timeline.findByIdAndRemove(req.params.id).then(() => {
      return res.json({success: true});
    });
  });
};