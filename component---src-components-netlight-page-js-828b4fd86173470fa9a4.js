"use strict";(self.webpackChunkmedlem=self.webpackChunkmedlem||[]).push([[593],{9153:function(M,L,j){j.r(L),j.d(L,{default:function(){return S}});var N={};j.r(N),j.d(N,{ZY:function(){return T},vU:function(){return g},Vp:function(){return D}});var u=j(7294),I=j(2777),T="netlight-module--buttons--d71b5",g="netlight-module--error--beef4",D="netlight-module--success--3a244",t=j(8043),y=j(746),z=j(7580),A=j(1288),E=j(2132);var S=()=>{const{0:M,1:L}=(0,u.useState)("Här kan du låsa upp sektionsrummet Netlight."),{0:j,1:S}=(0,u.useState)(""),{data:c}=(0,E.ZP)("/tools/netlight/",{refreshInterval:18e4}),i=async M=>{try{const{data:j}=await(0,t.v_)("/tools/netlight/"+M+"/");L(j.detail),S(D)}catch(j){void 0!==j.response&&j.response.data?L(j.response.data.detail):L("Kunde inte kommunicera med servern."),S(g)}};return u.createElement(y.Z,null,u.createElement(A.T,null,u.createElement(A.P,null,u.createElement("img",{className:N.logo,src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTUwLjU3IiBoZWlnaHQ9IjQxMi42MyI+PGRlZnM+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBkPSJNMCAzMDkuNDdoMTE2Mi45M1YwSDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjMzMzMzIDAgMCAtMS4zMzMzMyAwIDQxMi42MykiPjxwYXRoIGQ9Ik03OTEuODUgMTcuMjhhNzYuNyA3Ni43IDAgMCAwLTI2LjI3IDE3LjY1bDggMTIuNDRhNTkuMTcgNTkuMTcgMCAwIDEgMjIuMDctMTYuNDIgNjkuNDMgNjkuNDMgMCAwIDEgMjguMjItNS44MWMxNy4zOCAwIDMxLjAzIDUuMyA0MC45NiAxNS45MSA5LjkxIDEwLjYgMTQuODcgMjUuNzcgMTQuODcgNDUuNDl2MTEuNDJjLTEzLjgxLTEzLjA1LTMxLjA2LTE5LjU4LTUxLjcyLTE5LjU4LTIxLjIyIDAtMzkgNy01My4zNyAyMS0xNC4zNyAxNC4wMi0yMS41NSAzMi40NC0yMS41NSA1NS4yOCAwIDIyLjg1IDcuMTggNDEuMzEgMjEuNTUgNTUuMzkgMTQuMzcgMTQuMDcgMzIuMTUgMjEuMSA1My4zNyAyMS4xIDIwLjY2IDAgMzcuOS02LjUyIDUxLjcyLTE5LjU3bDIuODggMTQuNDhoMTIuMTFWODcuMzZjMC0yNC40OS02LjQ3LTQzLjMxLTE5LjQtNTYuNS0xMS4wNy0xMS4zLTI1LjIxLTE3Ljc2LTQyLjQ1LTE5LjM5aC0xNy41YTgyLjkyIDgyLjkyIDAgMCAwLTIzLjQ5IDUuODFNMjI5LjkgMjE5Ljc4VjgzLjQ3aDE0Ljk5djEwOS45NGE1NS40NCA1NS40NCAwIDAgMCAyMS4yNCAxNy40NGM4LjY5IDQuMTUgMTguMyA2LjIyIDI4Ljg0IDYuMjIgMTcuMjUgMCAzMC40NS00LjQ1IDM5LjYyLTEzLjM1IDkuMTctOC45MiAxMy43NS0yMS4xMiAxMy43NS0zNi42MlY4My40OGgxNC45OXY4Mi44MWMwIDExLjE1LTEuODkgMjEuMDEtNS42NSAyOS41OC0zLjc2IDguNTctOC44MiAxNS4zNC0xNS4xOSAyMC4zYTY4LjUzIDY4LjUzIDAgMCAxLTIxLjE0IDExLjIxIDc5LjUzIDc5LjUzIDAgMCAxLTI0Ljc0IDMuNzhjLTIwLjY2IDAtMzcuOS02LjUzLTUxLjcyLTE5LjU4TDI0MiAyMjYuMDZ6bTE3Ny41Ni0xMC4zNWMtMTQuMzctMTQuMDctMjEuNTYtMzIuNTMtMjEuNTYtNTUuMzggMC0xNC45NSAzLjY3LTI4LjI1IDEwLjk5LTM5Ljg3IDcuMzItMTEuNjMgMTYuOS0yMC40IDI4LjczLTI2LjMyIDExLjg1LTUuOTEgMjQuODEtOC44NyAzOC45LTguODcgMTQuMzcgMCAyNy41IDMuMjYgMzkuNDIgOS43OWE3Mi42OSA3Mi42OSAwIDAgMSAyOC4xMiAyNy4xM2wtMTYuODMuNGMtMTEuNS0xNC45NS0yOC40LTIyLjQzLTUwLjctMjIuNDMtMTcuOTMgMC0zMi42NCA1LjE3LTQ0LjE0IDE1LjUtMTAuOCA5LjkzLTE3LjEgMjMuMzItMTguODggNDAuMTloMTMzLjIyYzAgLjQuMDMgMS4xMi4xIDIuMTRzLjEgMS44LjEgMi4zNGMwIDIyLjk4LTcuMDggNDEuNDgtMjEuMjQgNTUuNDgtMTQuMTcgMTQuMDEtMzEuNzggMjEuMDItNTIuODYgMjEuMDItMjEuMjEgMC0zOS03LjA0LTUzLjM3LTIxLjEybS02LjE2LTQ3LjIyYzEuNjUgMTcgNy45IDMwLjE2IDE4Ljc4IDM5LjQ3IDEwLjg5IDkuMzIgMjQuNDcgMTMuOTggNDAuNzUgMTMuOTggMTYuMjkgMCAyOS43My00LjY2IDQwLjM0LTEzLjk4IDEwLjYtOS4zMSAxNi43My0yMi40NyAxOC4zNy0zOS40N3pNNTgwLjkgODYuMTNjLTMuMjggMi43Mi01Ljc0IDUuNC03LjM5IDguMDYtMS42NCAyLjY1LTIuODcgNi4wNS0zLjY5IDEwLjJhNzYuNTQgNzYuNTQgMCAwIDAtMS40NCA5LjY4Yy0uMTMgMi4zMi0uMiA1LjUtLjIgOS42djg5Ljc0SDU1My40bDEuODQgOS45OSAxMy43IDMuNDJjLjA2IDEuMDIuMDEgMTAuMzkgMCAyMC41NS0uMDIgMTEuNTIgMCAxNy4xMiAwIDE3LjEybDE0LjIyIDYuMDR2LTQ0LjQ3aDQ0Ljk2di0xMi42NWgtNDQuOTZ2LTc2LjljMC0yLjMxLS4wMy01LjQ0LS4xLTkuMzgtLjA3LTMuOTUtLjEtNi43Ny0uMS04LjQ3IDAtMS43LjEtMy45NC4zLTYuNzMuMjEtMi43OS41OS00Ljg2IDEuMTQtNi4yMi41NC0xLjM1IDEuMy0yLjkyIDIuMjUtNC43YTEyLjEgMTIuMSAwIDAgMSAzLjgtNC4yNyAzMi43IDMyLjcgMCAwIDEgNS42NC0zLjA2YzguMzYtMy42NyAxOS4yMy0yLjI1IDMyLjY0IDQuMjhsNS45Ni0xMS4wMmMtNS44OS0zLjgtMTIuODctNi4zOS0yMC45NC03Ljc0LTguMDgtMS4zNy0xNC45OS0xLjE2LTIwLjc0LjZhMzUuMjQgMzUuMjQgMCAwIDAtMTIuMSA2LjMzbTkzLjE5IDIxMi4zNFY4My40OGgtMTQuNzhWMjkyLjAzem0zNS42NS0yMTVoMTUuNjJWMjI2LjJoLTE1LjYyem0xNS4yMiAyMTVoLTE1LjYydi0yMC41NGgxNS42MnptMTA0LjY1LTgyLjJjMjIuMyAwIDM5LTcuNjIgNTAuMDgtMjIuODV2LTc3LjNjLTExLjA4LTE1LjI0LTI3Ljc3LTIyLjg1LTUwLjA4LTIyLjg1LTE4LjIgMC0zMy4wMSA1LjM3LTQ0LjQ0IDE2LjExLTExLjQzIDEwLjc1LTE3LjE0IDI1Ljg0LTE3LjE0IDQ1LjI4IDAgMTkuNDUgNS43IDM0LjU4IDE3LjE0IDQ1LjQgMTEuNDMgMTAuOCAyNi4yNCAxNi4yIDQ0LjQ0IDE2LjJtOTEuNzYtMTMyLjc4aDE0Ljk4djEwOS45NGE1NS40MyA1NS40MyAwIDAgMCAyMS4yNSAxNy40NGM4LjY4IDQuMTUgMTguMyA2LjIyIDI4Ljg0IDYuMjIgMTcuMjQgMCAzMC40NS00LjQ1IDM5LjYxLTEzLjM1IDkuMTctOC45MiAxMy43Ni0yMS4xMiAxMy43Ni0zNi42MlY4My40OGgxNC45OHY4Mi44MWMwIDExLjE1LTEuODggMjEuMDEtNS42NCAyOS41OC0zLjc3IDguNTctOC44MyAxNS4zNC0xNS4yIDIwLjNhNjguNTMgNjguNTMgMCAwIDEtMjEuMTQgMTEuMjEgNzkuNTIgNzkuNTIgMCAwIDEtMjQuNzMgMy43OGMtMjAuNjYgMC0zNy45LTYuNTMtNTEuNzMtMTkuNTh2ODAuMjZsLTE0Ljk4IDYuNjN6bTE3OS40IDIuNjVjLTMuMjggMi43Mi01Ljc0IDUuNC03LjM5IDguMDYtMS42NCAyLjY1LTIuODcgNi4wNS0zLjY5IDEwLjJhNzYuMjQgNzYuMjQgMCAwIDAtMS40NCA5LjY4Yy0uMTMgMi4zMi0uMiA1LjUtLjIgOS42djg5Ljc0aC0xNC43OHYxMi42NWgxNC43N2MuMTUgMi4xNy4yMSAxNyAuMjEgNDQuNDdsMTQuODktNi4wNi0uMS0zOC40aDQ0Ljk0VjIxMy40aC00NC45NXYtNzYuOWMwLTIuMzEtLjAzLTUuNDQtLjEtOS4zOC0uMDctMy45NS0uMS02Ljc3LS4xLTguNDcgMC0xLjcuMS0zLjk0LjMtNi43My4yMS0yLjc5LjU5LTQuODYgMS4xNC02LjIyLjU0LTEuMzUgMS4zLTIuOTIgMi4yNS00LjdhMTIuMSAxMi4xIDAgMCAxIDMuOC00LjI3IDMyLjY3IDMyLjY3IDAgMCAxIDUuNjUtMy4wNmM4LjM0LTMuNjcgMTkuMjItMi4yNSAzMi42MyA0LjI4bDUuOTUtMTEuMDJjLTUuODgtMy44LTEyLjg2LTYuMzktMjAuOTQtNy43NC04LjA3LTEuMzctMTQuOTgtMS4xNi0yMC43My42YTM1LjIgMzUuMiAwIDAgMC0xMi4xIDYuMzMiIGZpbGw9IiM3NDczYmQiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0xNTQuMzIgMTkzLjM2bC0xMDQuMyAyNS42OCAzLjgzLTY1LjV6IiBmaWxsPSIjYTZhMmRjIi8+PHBhdGggZD0iTTExLjU1IDEzNi43Nmw4LjU3LTU0LjA2TDkxLjggMTMxLjlsLTQzLjQgMTkuNDh6TTIxOC40NyAyMTguOGwtNTAuMDktMTkuODYgMy4wMi0xMi40NHoiIGZpbGw9IiM1NjVjOTgiLz48cGF0aCBkPSJNMTcxLjQgMTg2LjVsLTMuMDIgMTIuNDQtMTQuMDYtNS41OC0xMDAuNDctMzkuODMtNS40NS0yLjE2IDQzLjQtMTkuNDggMTA0LjE1LTQ2Ljc0eiIgZmlsbD0iIzc0NzNiZCIvPjwvZz48L3N2Zz4=",alt:"Netlight logo"}),u.createElement("p",{className:j},M),u.createElement("div",{className:T},u.createElement(z.hU,{iconComponent:I.UIZ,text:"Lås",onClick:()=>i("lock")}),u.createElement(z.hU,{iconComponent:I.PdD,text:"Lås upp",onClick:()=>i("unlock")})),c&&u.createElement("p",{style:{margin:0,marginTop:"1rem"}},"Batterinivå: "+Math.round(c.battery_percentage)+"%"))))}}}]);
//# sourceMappingURL=component---src-components-netlight-page-js-828b4fd86173470fa9a4.js.map