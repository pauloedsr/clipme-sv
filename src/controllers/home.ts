import Clip, { ClipModel } from "./../models/Clip";
import Timeline, { TimelineModel } from "./../models/Timeline";
import { Request, Response, NextFunction } from "express";
import { userInfo } from "os";

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    Timeline.find({autor : req.user.id}, (err, timelines) => {
      if (err) { return next(err); }
      if (timelines)
        return res.render("home", { title: "Home", timelines: timelines });
      else
        return res.render("home");
    });
  } else {
    res.render("home", {
      title: "Home"
    });
  }
};

export let view = (req: Request, res: Response, next: NextFunction) => {
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
    }).sort({createdAt : -1}).then(() => {
      clips.forEach(clip => {
        // clip.clip = new Buffer(clip.clip, "base64").toString("utf-8");
      });
      return res.render("view", {timeline: timeline, clips: clips});
    });
  });
};
