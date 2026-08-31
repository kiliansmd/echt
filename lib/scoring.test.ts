import {describe,expect,it} from "vitest";import {calculateScore} from "./scoring";
describe("calculateScore",()=>{it("awards base, speed and streak points",()=>expect(calculateScore(true,1000,2)).toEqual({points:160,nextStreak:3}));it("resets streak after an incorrect guess",()=>expect(calculateScore(false,100,8)).toEqual({points:0,nextStreak:0}))});
