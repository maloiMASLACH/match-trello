# 1. TasK
# https://docs.google.com/document/d/1VqWU3it9O2Ov5FfVGfP6Ece_jSdRBxsAUAROHYoFGNk/edit
# 2. How to run
 npm install
 npm run dev
 or
 npm run build
# 3. Database snapshot
    Database : 
        User token : {}
        User token : {}
        User token : {
            decks: {
                deck1 :{}
                deck2 :{
                    colons: {
                        colon1: {}
                        colon2: {
                            colonName: "..."
                            id: 2
                            tasks: {
                                task1: {}
                                task2: {}
                                task3: {
                                    completed: false
                                    date: tomorrow
                                    id: 3
                                    taskName: "...."
                                }
                            }
                        }
                    }
                    id: 2
                }
            }
            mail: ".....@gmail.com"
            name: "....."
            uid: /O8EHA5j....
        }
# 4. Deploy https://admiring-poincare-da02b3.netlify.app/
!!! To sing in like admin:
    e-mail: admin@gmail.com
    pass: 1234567890
# 5. File structure
    Root:
        -mode_modules
        -public  /public assets\
        -src 
            * __tests__
            * components
                ` JSX component
                ` ...
                ` JSX component
                    - name.tsx
                    - name.css
                ` pages
                    - page
                        ^ pageName.tsx
                        ^ pageName.css
                    - ...
                    - page
            * constants
                ` interfaces.tsx
                ` patterns.tsx
                ` routerLinks.tsx
            * utils
                ` dragEvents
                    - index.tsx
                ` fetchURIInfo
                    - index.tsx
                ` fireBase
                    - index.tsx
                    - context.tsx
                    - fireBase.tsx
                ` sessionHandler
                    - index.tsx
                ` sortCards
                    - index.tsx

                
