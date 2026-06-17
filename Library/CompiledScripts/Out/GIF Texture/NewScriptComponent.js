const {BasicScriptNode} = require('../BasicScriptNode');
const {
  customNode,
  component,
  input,
  output,
  serializeSceneObjectFlag,
  serializeProperty,
  label, readOnly, slider, spinBox, dropDown,
  textArea, header, showIf, tooltip, separator,
  space, groupBegin, groupEnd, disablePin,
} = require('../OrionDecorators');

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewScriptComponent = void 0;
let NewScriptComponent = class NewScriptComponent extends APJS.BasicScriptComponent {
    constructor() {
        super(...arguments);
        // ความเร็วพื้นฐาน
        this.speed = 100.0;
        // ตัวเก็บทิศทาง (X และ Y)
        this.dirX = 1.0;
        this.dirY = 1.0;
        // กรอบแคบๆ ตามที่คุณต้องการ
        this.limitX = 30.0;
        this.limitY = 30.0;
    }
    onStart() {
        console.log("เริ่มระบบ: น้องแมวเดินสุ่มทิศทาง");
        // สุ่มทิศทางเริ่มต้น
        this.randomizeDirection();
    }
    onUpdate(deltaTime) {
        const trans = this.getSceneObject().getTransform();
        if (!trans)
            return;
        let pos = trans.localPosition;
        // 1. เคลื่อนที่ตามทิศทางปัจจุบัน
        pos.x += this.speed * this.dirX * deltaTime;
        pos.y += this.speed * this.dirY * deltaTime;
        // 2. ถ้าชนขอบ ให้สุ่มทิศทางใหม่ (ทำให้ดูไม่ซ้ำซาก)
        if (Math.abs(pos.x) > this.limitX) {
            this.dirX *= -1; // เด้งกลับแกน X
            pos.x = pos.x > 0 ? this.limitX : -this.limitX;
            this.randomizeY(); // พอชนกำแพงซ้ายขวา ให้แอบเปลี่ยนความชันแกน Y นิดหน่อย
        }
        if (Math.abs(pos.y) > this.limitY) {
            this.dirY *= -1; // เด้งกลับแกน Y
            pos.y = pos.y > 0 ? this.limitY : -this.limitY;
            this.randomizeX(); // พอชนเพดานหรือพื้น ให้แอบเปลี่ยนความชันแกน X นิดหน่อย
        }
        trans.localPosition = pos;
    }
    // ฟังก์ชันสุ่มทิศทางใหม่ๆ
    randomizeDirection() {
        this.dirX = Math.random() > 0.5 ? 1 : -1;
        this.dirY = Math.random() > 0.5 ? 1 : -1;
    }
    randomizeX() {
        // สุ่มค่า X ให้มีความหลากหลาย (ไม่ใช่วิ่งแค่ 1 หรือ -1)
        this.dirX = (Math.random() * 0.6 + 0.4) * (this.dirX > 0 ? 1 : -1);
    }
    randomizeY() {
        // สุ่มค่า Y ให้มีความหลากหลาย
        this.dirY = (Math.random() * 0.6 + 0.4) * (this.dirY > 0 ? 1 : -1);
    }
    // เมื่อจิ้มที่ตัวแมว (ตอนนี้แค่ให้มันวาร์ปหนี แต่ไม่มีคะแนนแล้ว)
    onPointerDown() {
        const trans = this.getSceneObject().getTransform();
        if (trans) {
            trans.localPosition = new APJS.Vector3f((Math.random() - 0.5) * (this.limitX * 2), (Math.random() - 0.5) * (this.limitY * 2), 0);
            this.randomizeDirection(); // จิ้มแล้วเปลี่ยนทิศทางวิ่งด้วย
        }
        console.log("จิ้มโดนแมวแล้ว! (วาร์ปหนี)");
    }
};
NewScriptComponent = __decorate([
    component()
], NewScriptComponent);
exports.NewScriptComponent = NewScriptComponent;
