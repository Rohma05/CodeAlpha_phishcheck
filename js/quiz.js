(function(){
  // Each question: q, optional scene (the message being judged), opts (a = correct one), why
  var Q = [
    {q:"An email says your mailbox is full and links to 'expand storage'. The sender is support@micros0ft-security.com. What do you do?",
     opts:["Skip the link and check storage in your own settings","Click it, but only look at the page and don't sign in","Reply and ask them to confirm that it's really them","Forward it to the team so everyone can have a look"],a:0,
     why:"The sender's domain uses a zero in place of an o. Checking your storage through the real settings page costs nothing and sidesteps the link entirely. Replying only confirms your address is active."},
    {q:"Is this message likely to be phishing?",scene:"From: Northbank Alerts <alerts@northbank.example>\nSubject: New sign-in to your account\n\nWe noticed a sign-in from a new laptop today at 10:42. If this was you, you don't need to do anything. If not, open the Northbank app and choose Report.",
     opts:["Probably genuine. It has no link and nothing to enter","Phishing, because banks never send security alerts by email","Phishing, because it doesn't use your name","Can't tell without opening the attached security report"],a:0,
     why:"It asks for nothing, includes no link, and sends you to a route you already trust. Not every alert is a scam, and treating them all that way wears out your attention for the real ones."},
    {q:"You get this text. What is the biggest giveaway?",scene:"Parcel held at depot. Pay a 1.45 redelivery fee to release it: royalmail-redeliver.co/pay",
     opts:["The link goes to a domain the courier doesn't own","Couriers never contact anyone by text message at all","The fee is far too small to be believable as a charge","There's no tracking number included in the message"],a:0,
     why:"Real carriers use their own domain. A tiny fee is a classic trick: the attacker wants your card details, not 1.45. Some couriers do send texts, so judge the link, not the channel."},
    {q:"Someone phones saying they're from IT and asks you to read out the code you've just been texted. What should you do?",
     opts:["Read it out, since it's only six digits and expires quickly","Hang up and call IT back on the number from your intranet","Ask for their employee ID, then read it out if it checks out","Read half of it as a compromise and see how they respond"],a:1,
     why:"That code is the last lock on your account, and the caller is using it right now to get in. Support staff never need it from you. Calling back on a known number breaks the attacker's control of the conversation."},
    {q:"A message arrives from an unfamiliar number. It says it's your CEO, who's in a meeting and needs gift cards bought today and kept quiet. Best response?",
     opts:["Buy them and send the codes, then confirm afterwards","Reply to the number and ask a personal question only they'd know","Check with the CEO using a number or channel you already have","Ask your manager whether you should go ahead with it"],a:2,
     why:"Secrecy, urgency and an unusual payment method are the whole pattern. The check has to go through a route the attacker doesn't control. Replying to the same number keeps you talking to them."},
    {q:"You hover over a link and see this address. Which part tells you who really runs the site?",scene:"https://accounts.google.com.security-check.ru/login",
     opts:["accounts.google.com","google.com","security-check.ru","login"],a:2,
     why:"Read the domain just before the first single slash, working from the right. Everything in front of 'security-check.ru' is a subdomain the owner can name however they like."},
    {q:"A supplier you know emails 'invoice_2291.pdf.exe'. What is going on?",
     opts:["It's a normal invoice and the double extension is a formatting quirk","The supplier's system added .exe by mistake, so it's safe to open","A program dressed up as a PDF; don't open it, phone the supplier","It's likely a large file, so ask them to resend it as a zip file"],a:2,
     why:"The last extension is the real one, and .exe means it runs code on your computer. The supplier's account may itself be compromised, so check by phone before assuming they sent it."},
    {q:"You clicked a link and typed your password into the page before realising it was fake. What comes first?",
     opts:["Wait a day and see whether anything strange happens","Change the password on the real site, then tell IT","Delete the email and move on","Report it only if you notice something wrong later"],a:1,
     why:"Time matters because attackers often use stolen passwords within minutes. Reporting early also helps protect colleagues who got the same email, and nobody should be punished for speaking up."},
    {q:"What most clearly separates spear phishing from an ordinary mass phishing email?",
     opts:["It contains a link, which ordinary phishing emails never include","It is always sent from a genuine account that was compromised","It uses details about you, such as your manager or a project","It arrives outside normal working hours, often late at night"],a:2,
     why:"Spear phishing is personalised from research on social media, company websites or earlier leaks. Personal detail makes it feel trustworthy, which is why it's harder to spot."},
    {q:"Should you worry about this one?",scene:"From: HR Team <hr@yourcompany.example>\nSubject: Benefits sign-up opens Monday\n\nHi Alex, the annual benefits window opens Monday and runs for two weeks, as usual. You can find the guide on the HR page of the intranet.",
     opts:["Yes, since any HR email that mentions a deadline is phishing","Yes, because it doesn't include your employee number anywhere","No. It's expected, from the right domain, and links nowhere","No, but only after you reply to ask HR whether it's real"],a:2,
     why:"The timing matches the yearly pattern, the sender is internal, and there is no link or request. The right habit here is to reach the intranet your usual way, not to distrust everything."},
    {q:"At 2am your phone shows eight login approval prompts you didn't start. What is the right reaction?",
     opts:["Approve one so they stop, then check your account in the morning","Ignore them, since the attacker can't get in without approval","Deny every prompt, change your password, and tell IT","Turn off your phone and ask a colleague what to do tomorrow"],a:2,
     why:"This is called MFA fatigue. The attacker already has your password and is hoping you approve one out of annoyance. Deny, change the password, and report it."},
    {q:"A sticker with a QR code is placed over the sign on a car park machine, saying 'Scan to pay'. What's the safest choice?",
     opts:["Scan it, since it's more convenient than using coins","Scan it, but only if the page looks like the car park's","Check whether the sticker is the same as the one on other machines","Skip it and pay with the machine or the car park's official app"],a:3,
     why:"Criminals really do paste QR stickers over genuine signs (quishing). A copied payment page is easy to build, so looking right isn't proof. Use the machine or an app you installed yourself."}    ,
    {q:"A supplier emails that its bank details have changed and asks you to pay today. What should you do before paying?",
     opts:["Phone them on a number you already had to confirm it","Reply to the email and ask them to confirm the new details","Pay a small amount first to test that the new account works","Check that the logo and signature match previous invoices"],a:0,
     why:"Attackers copy logos and signatures easily, and replying goes straight back to them. A call to a number from your own records is the only reliable check."},
    {q:"You get a password-reset email for an account you never asked to reset. What now?",
     opts:["Click the link in the email to cancel the reset request","Don't click; open the site yourself and check there","Reply to say it wasn't you so the sender can investigate it","Forward it to a friend who is good with computers and ask them"],a:1,
     why:"Sometimes these are real warnings, sometimes bait. Either way the safe route is the same: go to the site directly and check, rather than trusting the link."},
    {q:"A friend messages 'Is this you in this video?!' with a link. It sounds unlike them. What's best?",
     opts:["Click it, because you trust this friend and they sent it","Open it on your phone, which is safer than a computer","Ask them on another channel, as their account may be hijacked","Reply in the same chat and ask what the video is about"],a:2,
     why:"Hijacked accounts are used to spread links because they come from someone you trust. Asking in the same chat could just reach the attacker again."},
    {q:"An email shows the name 'Priya Shah, Finance Director' but the address is priya.shah.finance@gmail.com. What does this suggest?",
     opts:["It's fine, because many directors use personal addresses too","Likely fake, since staff mail would use the company domain","It's fine, because Gmail checks that senders are who they say","It's an internal test message that was sent out by IT"],a:1,
     why:"The display name is just text anyone can type. A senior person writing from a free webmail account, when you normally see company mail, is worth checking in the staff directory."},
    {q:"Which habit protects you most if you do fall for a fake login page?",
     opts:["Using one very strong password on every single site you use","Adding the site name to the end of one base password","Changing your password every single week without fail","A different password for every account, kept in a manager"],a:3,
     why:"A stolen password then opens only one door. Reuse is what turns one slip into a chain of broken accounts, no matter how strong the password is."},
    {q:"A streaming service email says your payment failed and includes a link. You do have an account there. Best move?",
     opts:["Open the app or site yourself and look at billing","Click the link, since you do have an account","Reply with your card details to fix it faster","Ignore it for good, because these are always scams"],a:0,
     why:"Real payment problems exist, so ignoring them forever has a cost too. Checking through your own route handles both cases without trusting the link."},
    {q:"A browser pop-up shouts that your computer has a virus and gives a number to call. What do you do?",
     opts:["Call quickly, since the warning says it's urgent","Close the browser or tab, and call nobody","Download the scanner it offers to remove the virus","Click the X on the pop-up to dismiss it"],a:1,
     why:"Websites can't scan your computer for viruses. The number leads to scammers who want remote access and payment. Even the X button can be part of the trap, so close the whole tab or browser."},
    {q:"A colleague's email says only 'see attached' with a zip file and no other text. They normally write a few lines. What first?",
     opts:["Open it, as it came from a colleague","Scan it with antivirus and then open it","Message them on chat to ask if they sent it","Forward it to your manager to open instead"],a:2,
     why:"Compromised accounts send short, generic messages with attachments. A quick check on a different channel costs thirty seconds and may reveal the account is hacked."}
  ];

  var host=document.getElementById('quizHost'), order, i, score, log;
  function shuffle(a){a=a.slice();for(var k=a.length-1;k>0;k--){var j=Math.floor(Math.random()*(k+1));var t=a[k];a[k]=a[j];a[j]=t}return a}
  function esc(s){return s.replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}

  function start(){
    order=shuffle(Q.map(function(_,k){return k})); i=0; score=0; log=[]; ask();
  }
  function ask(){
    var item=Q[order[i]];
    var opts=shuffle(item.opts.map(function(t,k){return {t:t,ok:k===item.a}}));
    var h='<div class="qbox"><div class="qtop"><span>Question '+(i+1)+' of '+Q.length+'</span><span>Score '+score+'</span></div>'+
      '<div class="qprog"><i style="width:'+(i/Q.length*100)+'%"></i></div>'+
      '<h2>'+esc(item.q)+'</h2>'+(item.scene?'<p class="scene mono">'+esc(item.scene)+'</p>':'')+
      '<ul class="opts">'+opts.map(function(o,k){return '<li><button type="button" data-k="'+k+'">'+esc(o.t)+'</button></li>'}).join('')+'</ul>'+
      '<div class="fb" id="fb"></div><button class="btn" id="next" type="button" hidden>'+(i===Q.length-1?'See results':'Next question')+'</button></div>';
    host.innerHTML=h;
    var btns=host.querySelectorAll('.opts button'), answered=false;
    Array.prototype.forEach.call(btns,function(b,k){
      b.addEventListener('click',function(){
        if(answered) return; answered=true;
        var right=opts[k].ok; if(right) score++;
        log.push({q:item.q,ok:right});
        Array.prototype.forEach.call(btns,function(x,m){
          x.disabled=true; if(opts[m].ok) x.classList.add('right');
        });
        if(!right) b.classList.add('wrong');
        var fb=document.getElementById('fb'); fb.className='fb show';
        fb.innerHTML='<b>'+(right?'Correct. ':'Not quite. ')+'</b>'+esc(item.why);
        var n=document.getElementById('next'); n.hidden=false; n.focus();
        n.addEventListener('click',function(){ i++; if(i<Q.length) ask(); else finish(); });
      });
    });
  }
  function finish(){
    var best=0; try{best=+localStorage.getItem('pc-best')||0; if(score>best){best=score;localStorage.setItem('pc-best',score)}}catch(e){}
    var msg = score/Q.length>=.9?"Sharp eyes. You would be hard to catch.":
              score/Q.length>=.65?"Solid. A few more checks and you'll be hard to fool.":
              score/Q.length>=.4?"A decent start. Go back through the red-flag page and try again.":
              "Phishing is built to fool people, so this is common. Read through the course once more and retry.";
    host.innerHTML='<div class="qbox result"><h2>'+score+' out of '+Q.length+'</h2><p>'+msg+'</p><p class="mono" style="color:var(--muted)">Best on this device: '+best+'/'+Q.length+'</p>'+
      '<button class="btn" id="again" type="button">Try again</button> <a class="btn ghost" href="stay-safe.html">Review safety tips</a>'+
      '<ul class="review">'+log.map(function(l){return '<li><span class="'+(l.ok?'ok':'no')+'">'+(l.ok?'Right':'Missed')+'</span> '+esc(l.q)+'</li>'}).join('')+'</ul></div>';
    document.getElementById('again').addEventListener('click',start);
  }
  start();
})();
