const hexArray = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
            const paletteContainer = document.getElementById("paletteContainer");
            const optionsHover = document.createElement("div");

            function generatePalette(){
                event.preventDefault();
                clearPalette();

                const paletteSize = document.getElementById("numColors").value;

                for (let i=0; i<paletteSize; i++){
                    const colorSwatch = document.createElement("div");
                    colorSwatch.style.width = 100 / paletteSize + "%";
                    let color = generateRandomColor();
                    colorSwatch.style.background = color;

                    const hexContainer = document.createElement("div");
                    hexContainer.classList.add("hexContainer");
                    hexContainer.textContent = rgbToHex(colorSwatch.style.background);
                    colorSwatch.appendChild(hexContainer);

                    if (i===0 && i===paletteSize-1){colorSwatch.style.borderRadius="0.5rem";}
                    else if (i===0){colorSwatch.style.borderRadius="0.5rem 0 0 0.5rem";}
                    else if (i===paletteSize-1){colorSwatch.style.borderRadius="0 0.5rem 0.5rem 0";}

                    colorSwatch.addEventListener('mouseenter', showColorSwatchOptions);
                    colorSwatch.addEventListener('mouseleave', hideColorSwatchOptions);
                    paletteContainer.appendChild(colorSwatch);
                }
            }

            function generateRandomColor(){
                let color = "#";
                for (let h=0; h<6; h++){
                    const val = Math.floor(Math.random()*hexArray.length);
                    color += hexArray[val];
                }
                return color;
            }

            function showColorSwatchOptions(event){
                event.stopPropagation();

                optionsHover.style.backgroundColor = "rgba(255,255,255,0.5)";
                optionsHover.style.height = "30vh";
                optionsHover.style.margin = "auto";
                optionsHover.style.marginTop = "1rem";
                optionsHover.style.width = "75%";
                optionsHover.style.maxWidth = "50vw";
                optionsHover.style.padding = "1rem";
                optionsHover.style.textAlign = "center";
                optionsHover.style.borderRadius = "0.5rem";

                while(optionsHover.firstChild){
                    optionsHover.removeChild(optionsHover.firstChild);
                }

                const colorSwatch = event.currentTarget;
                colorSwatch.style.cursor = "pointer";

                const copyHexButton = document.createElement("button");
                copyHexButton.textContent = "Copy Hex Code";
                copyHexButton.classList.add("copyHexButton");
                copyHexButton.addEventListener('click', (event) => copyHex(colorSwatch, event));
                optionsHover.appendChild(copyHexButton);

                const optionsTitle = document.createElement("h3");
                optionsTitle.textContent = "Change Color?";
                optionsHover.appendChild(optionsTitle);

                const randomColorButton = document.createElement("button");
                randomColorButton.textContent = "Random Color";

                const inputDiv = document.createElement("div");
                const colorPickerInput = document.createElement("input");
                colorPickerInput.type = "color";
                colorPickerInput.id = "manualColor";
                colorPickerInput.name = "manualColor";
                colorPickerInput.value = rgbToHex(colorSwatch.style.background);

                // Now add the randomColorButton event listener so that it can also change the colorPickerInput value when a random color is generated.
                randomColorButton.addEventListener('click', (event) => randomlyChangeColor(colorSwatch, colorPickerInput, event));
                // Then append randomColorButton, because it is now complete.
                optionsHover.appendChild(randomColorButton);

                colorPickerInput.addEventListener('input', (event) => manuallyChangeColor(colorSwatch, event));
                colorPickerInput.addEventListener('change', (event) => manuallyChangeColor(colorSwatch, event));
                const labelForColorPicker = document.createElement("label");
                labelForColorPicker.for = "manualColor";
                labelForColorPicker.textContent = "Or Choose a Color:";
                labelForColorPicker.style.margin = "0.4rem";
                labelForColorPicker.style.display = "block";
                inputDiv.appendChild(labelForColorPicker);
                inputDiv.appendChild(colorPickerInput);
                optionsHover.appendChild(inputDiv);

                colorSwatch.appendChild(optionsHover);
            }

            function manuallyChangeColor(colorSwatch, event){
                const hexContainer = colorSwatch.querySelector(".hexContainer");
                colorSwatch.style.background = event.target.value;
                hexContainer.textContent = rgbToHex(colorSwatch.style.background);

                const button = colorSwatch.querySelector(".copyHexButton");
                changeButton(button, "Copy Hex Code")
            }

            function randomlyChangeColor(colorSwatch, colorPickerInput, event){
                const hexContainer = colorSwatch.querySelector(".hexContainer");
                colorSwatch.style.background = generateRandomColor();
                hexContainer.textContent = rgbToHex(colorSwatch.style.background);
                colorPickerInput.value = rgbToHex(colorSwatch.style.background);

                const button = colorSwatch.querySelector(".copyHexButton");
                changeButton(button, "Copy Hex Code")
            }

            function hideColorSwatchOptions(event){
                event.stopPropagation();
                const colorSwatch = event.currentTarget;
                colorSwatch.style.cursor = "auto";
                colorSwatch.removeChild(optionsHover);
            }

            function clearPalette(){
                while(paletteContainer.firstChild){
                    paletteContainer.removeChild(paletteContainer.firstChild);
                }
            }

            function rgbToHex(rgbString){
                let rgbEdit = rgbString.replace("rgb(","");
                rgbEdit = rgbEdit.replace(")","");
                const rgbArr = rgbEdit.split(",");
                r = Number(rgbArr[0]).toString(16);
                g = Number(rgbArr[1]).toString(16);
                b = Number(rgbArr[2]).toString(16);
                if (r.length === 1){r = "0" + r;}
                if (g.length === 1){g = "0" + g;}
                if (b.length === 1){b = "0" + b;}
                const hex = "#" + r + g + b;
                return hex;
            }

            function copyHex(colorSwatch, event){
                const hex = rgbToHex(colorSwatch.style.background);
                navigator.clipboard.writeText(hex);
                const button = event.currentTarget;
                button.textContent = "Copied!";

                setTimeout(function(){changeButton(button, "Copy Hex Code")}, 1500);
            }   

            function changeButton(button, text){button.textContent = text;}

            function printPalette(){
                const printName = document.getElementById("printName").value;
                if (printName.trim().length !== 0){
                    const paletteNamePrint = document.getElementById("paletteNamePrint");
                    paletteNamePrint.textContent = `Palette Name: ${printName}`;
                }

                window.print();
            }