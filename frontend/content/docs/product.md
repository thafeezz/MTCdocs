# building MTCdocs

# 🚧 CURRENTLY UNDER CONSTRUCTION 🚧

# common terms/related content

backend (hyperlink all of these)

frontend

lofi

hifi

MVP

SaaS

# who should read this?

if you are knew to making things in general, especially software, this doc will be a quick-start guide in how to get started by analyzing how the platform you are reading this on was built — MTCdocs.

when starting anything, there are ALWAYS barriers, with the first one is most commonly the hardest to get over. my hope is that this doc will make that barrier as low as possible by boiling down MTCdocs to the principles i used when thinking and executing the building of a simple web app.

for those who have experience building, feel free to read just to see how i think. maybe that will inspire some ideas or help you understand a different perspective.

### a note

terms like simple, difficult, etc are relative to the person’s experiences. dont be discouraged if this is something that seems very difficult and others find it easy — thats how life works in general. start with something smaller first (like this doc of a smaller proj TODO LINK HERE), then come back here and get started.

# intro

when building anything, we generally look at the principles of what we want to build by analyzing the who, what, where, when, why, and how our product will answer these questions

ill treat this doc as a sort of case study that analyzes MTCdocs itself, in order to help you (the reader) understand what ideas go thru a builder’s head. ill answer these below (note: i ordered these in the way i thought of these questions, but do what you find works best for you. i also order “how?” and “where?” interchangeably, one can be considered the superset of the other)

## what?

a platform that allows us to scale up and out the act of passing down critical information

## why?

why make this platform? why not just dump into a notion doc or gdocs?

my motivation was to provide the community with something polished that i didnt have while at umich. if youre interested, read the full story here → (link to context doc)

## who?

who will benefit? who is the target audience?

the goal is anyone. im starting by targeting just umich CS bc thats what i can talk about. but ideally this grows enough to help anyone at umich, outside umich, etc

## when?

build an MVP (minimum viable product, TODO link doc explaining here) ASAP, in order to maximize the # of people this reaches so they may benefit from it

## how?

this is the longest part and the main meat of this doc, keep reading to understand the answer to this question

## where?

this is kind of a subset of the “how?” question, but if its a web app it should work on both desktop and mobile

# ok, so how?

## product work

before starting, lets do some product work and decide what features should be in our MVP. i wanna include as many core features as possible while leaving as much room to build off of as possible, as while doing this as fast as possible.

## features

i decided MVP should include these main features

1. document publishing (starting with markdown)
   1. external document publishing
   2. built-in markdown editor
2. document hyperlinking/navigation
3. easy porting for other schools
   1. eg, UCB wants to have this for their school, integrate with existing codebase to allow for full customization while maintaining the above core features
4. minimal UI
   1. this is a requirement thru out the lifetime of the platform, but for now, SUPER minimal

now that i’ve decided on key features, i need to start imagining what this looks like. in my mind, i always jump to how this looks on the system side, bc thats what i enjoy doing. but generally, we need to look at what we are building and analyze how to attack this.

note: before reading forward, if you arent familiar with web app development, i would recommend reading the doc on EECS 485 (link)

## building

start with UI/UX design? system architecture? where do we start?

for a project like this, i like to create a super general mock-up that helps me put my vision down on paper/screen. in industry, this is referred to a low fidelity, or lo-fi, design. but for a data-driven/intensive application, we consider starting with our backend. point is, its application dependent

![a barebones view of what i imagine the homepage to look like](https://prod-files-secure.s3.us-west-2.amazonaws.com/436458d3-2164-4645-b390-f981234dbaed/054e3cae-981f-47a1-b3e7-8012ff13ec9e/image.png)

a barebones view of what i imagine the homepage to look like

now, some of these things ive never done, like building a built-in markdown editor. but lets go thru these 1-by-1 to figure this out. ill split these features in to their frontend and backend parts:

## frontend

immediate, key thought, majority of pages are rendered on the server

### 1. doc publishing

1. definitely an existing api and component for this
2. theres probably a premade component somewhere, but i want this one to have knowledge of docs in the platform. this will allow for easy indexing and hyperlinking

### 2. document hyperlinking/navigation

this can be done with basic HTML (link) and a framework that supports routing

### 3. integrations

other integrations will be responsible for this part, the code should just be written such that it is easy for others to integrate

### 4. UI

some combination of web technologies, at its core, HTML/CSS/JS (+figma)

## backend

### 1. doc publishing

user uploads new markdown file

md file stored in blob storage

metadata for pages stored in relational DB

user navigates to a new page

retrieve page from server

page cached in CDN

### 2. hyperlink/doc nav

serverside search

cache frequent queries
