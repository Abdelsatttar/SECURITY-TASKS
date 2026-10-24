"use strict";
const input=document.getElementById("caesarInput");
const shiftInput=document.getElementById("caesarShift");
const output=document.getElementById("caesarOutput");
const feedback=document.getElementById("feedback");
const count=document.getElementById("charCount");
function reportHeight(){parent.postMessage({type:"securelab-resize",height:document.documentElement.scrollHeight},"*")}
function notify(message,error){parent.postMessage({type:"securelab-resize",height:document.documentElement.scrollHeight,toast:message,error:!!error},"*")}
function transform(text,shift){const s=((Number(shift)%26)+26)%26;return Array.from(text).map(ch=>{const c=ch.charCodeAt(0);if(c>=65&&c<=90)return String.fromCharCode((c-65+s)%26+65);if(c>=97&&c<=122)return String.fromCharCode((c-97+s)%26+97);return ch}).join("")}
function setResult(value,placeholder){output.textContent=value||placeholder||"";output.classList.toggle("placeholder",!value);reportHeight()}
function showMessage(text,error){feedback.textContent=text;feedback.classList.toggle("error",!!error);reportHeight()}
input.addEventListener("input",()=>{const n=Array.from(input.value).length;count.textContent=n+(n===1?" character":" characters")});
document.getElementById("encryptBtn").addEventListener("click",()=>{if(!input.value.length){setResult("","Enter a message to encrypt.");showMessage("Please enter a message first.",true);return}setResult(transform(input.value,shiftInput.value));showMessage("Encrypted using a shift of "+shiftInput.value+".");notify("Message encrypted.")});
document.getElementById("decryptBtn").addEventListener("click",()=>{if(!input.value.length){setResult("","Enter a message to decrypt.");showMessage("Please enter a message first.",true);return}setResult(transform(input.value,-Number(shiftInput.value)));showMessage("Decrypted using a shift of "+shiftInput.value+".");notify("Message decrypted.")});
document.getElementById("copyBtn").addEventListener("click",async()=>{if(output.classList.contains("placeholder")){notify("Generate a result before copying it.",true);return}try{await navigator.clipboard.writeText(output.textContent);notify("Result copied to clipboard.")}catch(e){const box=document.createElement("textarea");box.value=output.textContent;document.body.appendChild(box);box.select();document.execCommand("copy");box.remove();notify("Result copied to clipboard.")}});
if(window.ResizeObserver)new ResizeObserver(reportHeight).observe(document.body);reportHeight();