(function(){
  var mails = {
    bad: {
      html:
        '<div class="mail"><div class="hd">' +
        '<div><span class="k">From</span><button class="hot bad" data-id="sender">"Microsoft Account Team" &lt;no-reply@account-microsft.com&gt;</button></div>' +
        '<div><span class="k">To</span>you@yourmail.com</div>' +
        '<div><span class="k">Subject</span><button class="hot bad" data-id="subject">Action required: your account will be suspended in 24 hours</button></div></div>' +
        '<div class="bd">' +
        '<p><button class="hot bad" data-id="greeting">Dear Customer,</button></p>' +
        '<p>We detected unusual sign-in activity on your Microsoft account. <button class="hot bad" data-id="typo">Your acount</button> will be closed permanently unless you confirm your details today.</p>' +
        '<p><button class="hot bad" data-id="link"><span class="fakebtn">Verify my account</span></button><br><small class="mono">https://login.microsoftonline.com.verify-session.top/auth</small></p>' +
        '<p>Thanks,<br>Microsoft Security</p></div>' +
        '<div class="att">&#128206; <button class="hot bad" data-id="attach">Security_Report.pdf.exe</button> <small>(412 KB)</small></div></div>',
      flags: {
        sender: ["Lookalike sender", "The name says Microsoft but the address ends in account-microsft.com. One missing letter is enough to fool a quick glance. Always read the domain after the @."],
        subject: ["Manufactured urgency", "A 24-hour deadline and a threat to your account are meant to rush you. Real providers rarely suspend accounts by surprise and usually give you several ways to resolve things."],
        greeting: ["Generic greeting", "Companies that hold your account normally know your name. 'Dear Customer' suggests the same message went to a huge list."],
        typo: ["Sloppy wording", "'Acount' is a spelling slip. Not every phishing email has one, and plenty of real emails do, so treat it as a hint rather than proof."],
        link: ["The link is a trap", "Read the address from right to left. The real domain is verify-session.top, and 'login.microsoftonline.com' is just a subdomain placed in front of it to look trustworthy."],
        attach: ["Disguised program", "A file ending .pdf.exe is a program, not a document. Windows may hide the last extension, which is exactly why attackers use it. Never open it."]
      }
    },
    good: {
      html:
        '<div class="mail"><div class="hd">' +
        '<div><span class="k">From</span><button class="hot" data-id="sender">Northfield Library &lt;notices@northfieldlibrary.org&gt;</button></div>' +
        '<div><span class="k">To</span>you@yourmail.com</div>' +
        '<div><span class="k">Subject</span><button class="hot" data-id="subject">Your book is due on Friday</button></div></div>' +
        '<div class="bd">' +
        '<p><button class="hot" data-id="greeting">Hi Jamie,</button></p>' +
        '<p>This is a reminder that <i>The Overstory</i> is due back on Friday. You can renew it up to two times from your account if nobody else is waiting.</p>' +
        '<p><button class="hot" data-id="link">Manage my loans</button><br><small class="mono">https://northfieldlibrary.org/account/loans</small></p>' +
        '<p><button class="hot" data-id="ask">No payment or password is requested in this email.</button></p>' +
        '<p>The Northfield Library team</p></div></div>',
      flags: {
        sender: ["Matching domain", "The address is on northfieldlibrary.org, the same domain as the library's website. It's not proof on its own, since senders can be faked, but it is what you'd expect."],
        subject: ["Calm and specific", "It names a real book you borrowed and a plain date. Nothing threatens you or hurries you."],
        greeting: ["Uses your name", "You gave the library your name, and it uses it. Generic greetings are suspicious from companies that know you."],
        link: ["Link matches the sender", "The address is on the same domain as the sender and the library's site. Even so, the safest habit is to open your bookmark instead of clicking."],
        ask: ["Asks for nothing sensitive", "It doesn't want a password, card number or code. This is the strongest sign here. A message that only informs you gives an attacker very little to work with."]
      }
    }
  };
  mails.invoice={
    html:
      '<div class="mail"><div class="hd">'+
      '<div><span class="k">From</span><button class="hot bad" data-id="sender">Brightline Supplies Accounts &lt;billing@brightline-supplies.co&gt;</button></div>'+
      '<div><span class="k">To</span>accounts@yourcompany.com</div>'+
      '<div><span class="k">Subject</span>Invoice 4471 - updated payment details</div></div>'+
      '<div class="bd"><p>Hello,</p><p>Please find invoice 4471 for this month\'s order. <button class="hot bad" data-id="bank">Our bank details have changed, so please pay into the new account below.</button></p>'+
      '<p class="mono">Sort code 20-45-67<br>Account 83920174</p>'+
      '<p><button class="hot bad" data-id="pressure">Payment is needed by 5pm today to avoid the order being cancelled.</button> <button class="hot bad" data-id="nocall">Please reply by email only, as our phone lines are down.</button></p>'+
      '<p>Kind regards,<br>Accounts Team</p></div></div>',
    flags:{
      sender:["Near-match sender","Your real supplier uses brightline-supplies.com. This one ends in .co. A single missing letter in the domain is a common trick in invoice fraud."],
      bank:["Changed bank details","This is the heart of the scam. Any change to where money goes must be confirmed with a known contact, using contact details you already hold."],
      pressure:["Artificial deadline","Same pressure tactic as before. Genuine suppliers rarely cancel an order over a few hours."],
      nocall:["Blocking the check","Telling you not to phone is a deliberate move to stop you verifying. A real firm would be happy for you to call."]
    },
    done:"That's the pattern behind the Google and Facebook case: a believable invoice with new bank details."
  };
  mails.text={
    html:
      '<div class="mail"><div class="hd">'+
      '<div><span class="k">From</span><button class="hot bad" data-id="number">+44 7700 900482</button></div>'+
      '<div><span class="k">Today</span>09:14</div></div>'+
      '<div class="bd"><p>Hi it\'s <button class="hot bad" data-id="hi">your bank</button>. <button class="hot bad" data-id="fraud">A payment of 899 to "Techzone" has been flagged as fraud.</button></p>'+
      '<p>To cancel it, <button class="hot bad" data-id="link">log in here immediately: bit.ly/3xQ-secure</button></p>'+
      '<p>Reply STOP to opt out.</p></div></div>',
    flags:{
      number:["Unknown number","Banks usually send alerts from a short code or the same number as past messages. A random mobile number is a poor sign, though numbers can be spoofed too."],
      hi:["Vague identity","It says 'your bank' without naming it. A real alert would use the bank's name and often your name."],
      fraud:["Fear and surprise","A large payment you don't recognise is meant to make you panic and act without checking."],
      link:["Shortened link","A bit.ly address hides the real destination. Banks send you to their app or to their own domain. Open the app yourself."]
    },
    done:"Texts leave less room to inspect, so the safest move is to ignore the link and open your bank's app."
  };
  var host=document.getElementById('mailHost'), tabs=document.querySelectorAll('.tabs button'),
      pT=document.getElementById('pTitle'), pX=document.getElementById('pText'),
      bar=document.getElementById('bar'), cnt=document.getElementById('count'), done=document.getElementById('done');
  var found={bad:{},good:{},invoice:{},text:{}}, current='bad';

  function show(){
    var m=mails[current], total=Object.keys(m.flags).length, n=Object.keys(found[current]).length;
    host.innerHTML=m.html;
    Array.prototype.forEach.call(host.querySelectorAll('.hot'),function(b){
      if(found[current][b.dataset.id]) b.classList.add('found');
      b.addEventListener('click',function(){
        var f=m.flags[b.dataset.id];
        pT.textContent=f[0]; pX.textContent=f[1];
        found[current][b.dataset.id]=true; b.classList.add('found'); update();
      });
    });
    pT.textContent='Nothing selected yet';
    pX.textContent='Pick any underlined part of the email to see what it tells you.';
    update();
  }
  function update(){
    var m=mails[current], total=Object.keys(m.flags).length, n=Object.keys(found[current]).length;
    bar.style.width=(n/total*100)+'%';
    cnt.textContent=n+' of '+total+' details checked';
    if(n===total){
      done.className='done show';
      done.textContent = m.done || (current==='bad'
        ? 'That is every flag. Now open the genuine email to see what a normal message looks like.'
        : 'Good. Notice how little a genuine message asks of you. Ready for the quiz?');
    } else done.className='done';
  }
  Array.prototype.forEach.call(tabs,function(t){
    t.addEventListener('click',function(){
      current=t.dataset.mail;
      Array.prototype.forEach.call(tabs,function(x){x.setAttribute('aria-selected',x===t)});
      show();
    });
  });
  show();
})();
