# EECS

## Academics

Salam! I'm going to keep this centered around EECS courses, since those are most relevant to my experience, since I got out of a lot of prerequisites before starting CS here at UMich (LSA by the way).

### EECS 183

#### Intro

183 was basically my first foray into actually programming - I had taken AP CS Principles in the 10th grade, and some intro to programming course senior year of high school, but I had effectively forgotten everything. That being said, I did brush up a little on super basic concepts before the course started, so things like: - What are some primitive data types (integers, strings, floats, characters)? - What are arrays? - For loops, while loops - Conditionals, booleans (true/false) - What is a function?

#### Lecture

Once the course started, I went to a few lectures from Professor Arthur, and quickly realized that the content was mostly stuff I already knew, and that I was wasting my time going to lecture (and lab). I don't recommend skipping unless you truly know the content, since it's such a foundational course. Also, you lose 1% of your grade if you skip lecture. The only thing I learned specifically from 183 is what a class is, and how to begin to think of programming in an object oriented way, and building custom data types.

#### Lab

If you know what's going on in class, lab will be the easiest thing in the world. The lab slides are always terrible and confusing, so just skip to do the lab assignment and work backwards. The instructors aren't guaranteed to be great (undergraduate teaching assistants usually teach 183 lab sections), so their explanations may not be the best resource.

#### Projects

The projects for 183 seem daunting at first, I would recommend writing out the flow of the program - "What can happen with input like this?" - and think through all the conditionals and loops that you need to write out to achieve that. 183's projects are essentially just a bunch of if statements and for loops, so realizing that early can help you finish the projects quickly and accurately.

#### Exams

The exams are actually somewhat challenging from what I remember, but that's since most of the multiple choice are trick questions that are testing your knowledge of edge case facts about simple C++ behavior, if I remember correctly. I didn't study for either exam and tanked a B+ and a C+, but if you have perfect project grades, it's fine and you will get an A.

#### Final Project

Lastly, the final project: I'd recommend doing Elevators, or whatever the non Arduino project is for your semester. Pick a super simple algorithm, don't try anything confusing and you will get a 100% on first submission.

> For elevators, I wrote an algorithm that chose the first available elevator from 0-2, in increasing order, and sent it to the floor with the highest average anger per person waiting to be serviced. I got 100% on my first submission of the "Reach" part.

### EECS 203

#### Intro

Take this with 280, you'll thank me later.

This is my favorite EECS course ever, since there's no programming (YAY). At the same time, you need to completely context switch from basically any course you have ever taken before, math or otherwise (unless you have done proof-based or some type of honors math before this,
which is not applicable to most).

#### Homework

Go to office hours, do your homework entirely in office hours. I'd recommend 2 3-hour sessions of just sitting in office hours and working on your homework problem set, while talking with the IAs and getting a little help from them. Make sure you stay up to date with lecture, since the homework will be extremely hard without it. It's still challenging regardless, and ChatGPT probably isn't good enough to help you that much, so make sure you understand it well.

Some of the probability and counting problem sets will be out of this world difficult, so you are likely to need to use one of your drops. If you make a good case, you can get an additional drop through admin form.

#### Lectures

Professors are usually good for this course, ask around and shop around for opinions, and try out different professors if you need to. Important to stay on track.

#### Discussion

Discussion is essentially useless, if they don't let you work on the homework. The discussion problems take forever, so if you're going slowly through it in discussion, just go ahead and skip. The problems are good practice though, but the main problem is that you will usually only cover one topic in discussion since you will be going so slowly (if it's a section where they work through the problem packet).

#### Exams

There's 3 exams, they're a big step from previous exams you've taken if you haven't done proofs before. Do practice exams, start early on reviewing and STAY UP TO DATE ON LECTURE. Do all these things and life will be okay.

### EECS 280

#### Intro

Take this with 203, you'll thank me later.

280 is a big step up, especially if you're coming from ENGR 101. Don't fret, since they give a lot of time to acclimate to more C++. 280 is where you should probably focus on lecture - there isn't a great deal of content covered throughout the course, but learning the content well is crucial for your understanding of software for later on (later courses, JOB INTERVIEWS, etc).

#### Lecture

For lecture, the Juett recordings (if available) - are perfect and suitable for all your needs. If you want to go all the way to North for lecture, feel free. Studio recordings are best.

#### Projects

The most important thing you can do for projects in 280 is write a test suite that covers every imaginable outcome.

### EECS 281

#### Intro

Take this with 370/376 - I recommend 370 if you want to take 482 (Operating Systems), or any other systems/low-level course as early as possible.

281 is important for recruiting for software engineering internships, and it will absolutely be a big asset to your Leetcode skills if you put in the effort.

Also, search AJZHOU 281 IA notes - this is a great resource.

#### Lecture

They're really boring. I'd just read the lecture notes.

#### Lab

Lab is required, and you don't need to really think too hard in lab. If you're struggling with a project, use your IA as a resource for questions. Otherwise, you can GPT all the lab questions (the rare hard ones) and you won't lose any understanding of the course content.

#### Projects

There's no starter code. Don't freak out.

Approach the projects like exams. The staff is trying to test you on your knowledge of BFS/DFS, for example. Once you figure out what they're testing you on, and you realize that the spec is worded carefully to try and trip you up, then the projects seem less like creative, unguided endeavors and more like any other assignment. That being said, this strategy ruins the mystery of solving the projects like a movie hacker.

You should think about writing clean code split up into functions that all serve a specific purpose. Ask questions, check previously asked questions on Ed/Piazza, ask your friends, IAs, find out what data structures you need, and what data you need to keep track of to solve the problem. There's usually only one real "right" way to build the project.

Once you have written the main functionality, make a flow chart - what can happen given any input, what should be printed, and what should happen to underlying data structures? Write tests that cover every single one of these cases. Run these through the debugger - if you have no errors, congratulations! You got a perfect score. Every project is simple to get a 100 on, if you test properly, unlike 280 where it's a little harder to get a perfect score on the huge private test suite. Private tests aren't important in 281, they only reflect a tiny bit of your grade.

Follow the optimization rules, it's helpful for interviews sometimes, and 370 explains most of the optimization strategies.

#### Exams

The exams are pretty hard. I'll focus on the FRQ sections: if you have done the projects well, the FRQ's usually aren't bad, except for the final exam's dynamic programming question. I'd recommend just writing every single DP problem ever previously shown and praying the one you get is similar. Or you could just study DP hard and figure out how to solve it.

### EECS 370

#### Intro

I'd take this with 281, since that's what I (the author) did.

#### Lab

Lab is annoying, since you get a random group. However, you only need an 80% on the lab assignment, so it's pretty doable if at least one out of four partners is up to date on lectures.
Spend little energy worrying about lab.

#### Homework

The homework is typically not horrible, most students do well. If you're up to date on lecture, you can do well on all the HW assignments. I'd recommend having the relevant studio lecture (or your notes) up on your laptop for reference while solving the homework, just so you can check if your logic makes sense.

#### Projects

370 projects are much simpler than they sound, they're all straight forward, and really only one way to do them. Do not overthink the projects!

#### Exams

Exams for this course are usually punishing. Stay up to date on lecture, and focus mostly on the written part when preparing, since the bulk of your grade comes from this section. Make a robust cheat sheet with at least one example of each type of FRQ (each topic).

## Recruiting (SWE)

This is mainly towards underclassmen, since I (the author) am still an underclassman. You should try to get an internship now, since it'll help a lot later on when you are a junior/senior. You can probably take my advice, since I have some level of credibility (have landed 2 internship offers as a sophomore, one at a F500, and one at a unicorn startup).

There are a few key rules and tips to landing an internship as an underclassman.

1. The hardest part is getting the interview.
2. Apply early, and apply often.
   1. This means checking Github repositories with internships religiously, every single day, multiple times a day. Apply as soon as you see a new job posting that you haven't applied to.
3. Beggars can't be choosers.
   1. If you haven't had any experience yet, you should be applying to anywhere in the US, at any salary (paid experience)
4. Make sure your resumé is good enough.

On the topic of resumés, a few things you should constantly be doing to revise your resumé are:

- asking upperclassmen/Muslim graduates to read over your resumé and give feedback, preferably people whose advice you trust since they have had some success
- adding your fall and winter courses to your resumé under relevant coursework, and adding the projects from that course if you need better projects
- DON'T NOT APPLY TO SOMETHING BECAUSE YOU'RE "WAITING TO MAKE YOUR RESUMÉ GOOD"!!!!!
  - It's never going to be good if you keep waiting to apply to things, I promise.

Go to hackathons to build projects if you are too lazy to build side projects. It'll force you to go 0-1 in 24-36 hours, and it's usually going to sound good enough to put on your resumé. You don't necessarily need to mention that it was a group project.

I did an unpaid internship my freshman summer (before sophomore year). Did it help? Yes. Would I recommend? No.

Try applying to the mythical freshman/sophomore internships at big companies, since it never hurts to apply. To get something as a freshman, you will definitely need side projects on your resumé, whether they come from hackathons, etc. Your course projects will not be cool enough to land you anything great for the most part, unless you take a super interesting/hard upper level CS course.

I'd recommend emailing/reaching out or using nepo to land something as a freshman. Think about cold emailing some startups. Resources for that sort of thing will be added to this doc later.

Lastly, never settle: if you get an offer that isn't an absolute end game offer, first of all, congrats! Second of all, you can keep applying to only jobs that are better than your current offer, and using it as leverage to expedite/negotiate any further processes.
