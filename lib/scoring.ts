export function calculateScore(correct:boolean,responseTimeMs:number,streak:number){
 if(!correct) return {points:0,nextStreak:0};
 const speedBonus=Math.max(0,Math.round(50-(responseTimeMs/100)));
 const streakBonus=Math.min(streak*10,50);
 return {points:100+speedBonus+streakBonus,nextStreak:streak+1};
}
