# Day 2 Tailwind CSS

## 1. CSS Selectors

### File: selectors.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Selectors</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <h1 class="bg-yellow-400">Welcome to CSS Selectors</h1>
            <p id="main-content" class="p-5 bg-gray-200">This is an example paragraph.</p>
            <p class="text-blue-500">This is another paragraph.</p>
        </body>
        </html>
```

## 2. CSS Box Model

### File: box-model.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Box Model</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="w-48 p-5 border-4 border-black m-2 bg-blue-200">This is a box model example.</div>
        </body>
        </html>

```

## 3. CSS Flexbox

### File: flex.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Flexbox</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="flex justify-between items-center bg-gray-200 p-5">
                <div class="bg-red-400 p-5 flex-1 text-center m-1">Item 1</div>
                <div class="bg-red-400 p-5 flex-1 text-center m-1">Item 2</div>
                <div class="bg-red-400 p-5 flex-1 text-center m-1">Item 3</div>
            </div>
        </body>
        </html>

```

## 4. CSS Grid

### File: grid.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Grid</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="grid grid-cols-3 gap-2 p-5">
                <div class="col-span-3 bg-green-300 p-5 text-center">Header</div>
                <div class="bg-green-300 p-5 text-center">Sidebar</div>
                <div class="col-span-2 bg-green-300 p-5 text-center">Main Content</div>
                <div class="col-span-3 bg-green-300 p-5 text-center">Footer</div>
            </div>
        </body>
        </html>

```

## 5. CSS Transitions

### File: transitions.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Transitions</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="w-24 h-24 bg-red-500 transition-transform duration-500 ease-in-out hover:rotate-45 m-5"></div>
        </body>
        </html>

```

## 6. CSS Media Queries

### File: media-queries.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Media Queries</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="container mx-auto p-5 bg-blue-200 sm:bg-green-200">
                <div class="bg-red-400 p-5 text-center sm:bg-yellow-200">This is a responsive box.</div>
            </div>
        </body>
        </html>

```

## 7. CSS Variables

### File: variables.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Variables</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <button class="bg-blue-500 text-white p-2.5 m-1">Primary Button</button>
            <button class="bg-green-500 text-white p-2.5 m-1">Secondary Button</button>
        </body>
        </html>

```

## 8. CSS Positioning

### File: positioning.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Positioning</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="relative h-48 bg-blue-200">
                <div class="relative top-5 left-5 bg-orange-400 p-2">Relative Position</div>
                <div class="absolute top-14 left-14 bg-green-400 p-2">Absolute Position</div>
                <div class="fixed bottom-2 right-2 bg-red-400 p-2">Fixed Position</div>
            </div>
        </body>
        </html>

```

## 9. CSS Z-Index

### File: z-index.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Z-Index</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="absolute w-24 h-24 bg-red-500 top-12 left-12 z-30 text-white p-2">Box 1</div>
            <div class="absolute w-24 h-24 bg-green-500 top-24 left-24 z-20 text-white p-2">Box 2</div>
            <div class="absolute w-24 h-24 bg-blue-500 top-36 left-36 z-10 text-white p-2">Box 3</div>
        </body>
        </html>

```

## 10. CSS Animations

### File: animations.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Animations</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="w-24 h-24 bg-orange-400 p-5 text-white animate-ping">Animate Me!</div>
        </body>
        </html>

```

## 11. CSS Pseudo-classes and Pseudo-elements

### File: pseudo-classes.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Pseudo-classes</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <button class="bg-blue-200 p-2 hover:bg-orange-400 hover:text-white">Hover me</button>
            <p class="text-xl first-letter:text-4xl first-letter:text-red-500">Highlighted text</p>
        </body>
        </html>

```

## 13. CSS Backgrounds

### File: backgrounds.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Backgrounds</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="h-52 mb-5 bg-cover bg-center" style="background-image: url('https://via.placeholder.com/300');">
                Background Image
            </div>
            <div class="h-24 mb-5 bg-lightcoral text-white text-center flex items-center justify-center">
                Background Color
            </div>
            <div class="h-24 bg-gradient-to-r from-red-500 to-blue-500 text-white text-center flex items-center justify-center">
                Background Gradient
            </div>
        </body>
        </html>

```

## 14. CSS Typography

### File: typography.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Typography</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="font-sans leading-relaxed text-gray-800">
            <h1 class="text-3xl font-bold text-blue-500">This is a Heading 1</h1>
            <p class="text-base mt-3 text-justify">
                This is a paragraph with custom typography settings.
            </p>
        </body>
        </html>

```

## 15. CSS Responsive Design

### File: responsive.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSS Responsive Design</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="w-full max-w-screen-xl bg-lightcoral m-auto p-5 text-white text-center sm:bg-lightblue xs:bg-lightgreen">
                Resize the window to see the effect.
            </div>
        </body>
        </html>

```