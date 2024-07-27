function validateForm()
/*
פונקציה זו נקראת לאחר כל עדכון שמתבצע בטופס בשדות המשפיעים על האפשרות לשלוח הזמנה:
updateBeverage() - קוראת לפונקציה הנוכחית בכדי לעדכן כאשר המשתמש בחר שתייה 
textInput (from html page) - קורא לפונקציה זו בעת כל עדכון שנוכל לדעת האם המשתמש כתב שם לטופס או לא
הפונקציה תבדוק האם קיים שם ושתייה ותעדכן את כפתור האישור בהתאם
*/
{
    // שמירת הערכים מהטופס למשתנים
    var textInput = document.getElementById('textInput').value; // יכיל מחרוזת של קלט שם הלקוח
    var submitButton = document.getElementById('submitButton'); 
    var beverages = document.querySelectorAll('input[name="beverages"]:checked'); // הסבר על הפקודה במסמך נלווה - יכיל את רשימת קלט המשקאות שסומנו

    // מעדכן אמת/שקר על ידי בדיקת האם קלט השם קיים ואורך רשימת קלט המשקאות שסומנו גדול מ0
    submitButton.disabled = !(textInput && beverages.length > 0); // ! = not - כלומר ההופכי של תוצאת הסוגריים - true -> false ולההפך
}

function updatePizza()
/*
פונקציה זו נקראת לאחר כל עדכון בבחירת התוספות לפיצה.
*/
{
    // שמירת הערכים מהטופס למשתנים
    var selectedToppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(checkbox => checkbox.value); // הסבר על הפקודה במסמך נלווה - יכיל מערך של כל ערכי התוספות לפיצה שנבחרו
    var toppingCombination = selectedToppings.sort().join('_'); // הסבר על הפקודה במסמך נלווה - ממיין את מערך התוספות ויוצר שרשור מחרוזת בינהם כאשר בין תוספת לתוספת נוסף התו "_"

    // בודק עם קומבנציית כל התוספות ריקה  - כלומר המשתמש אינו בחר תוספת
    if (toppingCombination == '')
    {
        toppingCombination = 'default';
    }

    // יוצר את נתיב הקובץ על ידי בניית שם הקובץ בשרשור תחילת הנתיב + הקומבנציה + סיומת הקובץ
    var imagePath = "Images/pizza_" + toppingCombination + ".png";

    // מעדכן את התמונה קובץ לקומבינציה החדשה שהמשתמש בחר
    document.getElementById('pizzaImage').src = imagePath;
}

function updateBeverage()
 /*
 פונקציה זו נקראת לאחר כל עדכון בבחירת המשקה.
 */
{
    // שמירת הערכים מהטופס למשתנים
    var selectedBeverage = document.querySelector('input[name="beverages"]:checked').value; //הסבר על הפקודה במסמך נלווה - יכיל את שם המשקה הנבחר
    var beverageImages = document.querySelectorAll('.beverage'); //הסבר על הפקודה במסמך נלווה - יכיל רשימה של כל מחלקות התמונה שנקראות "beverage"

    // ריצה בלולאה על כל מחלקות תמונות המשקאות - בכל סיבוב של הלולאה נקבל את מחלקת תמונת המשקה הבאה
    // הסבר על for let of במסמך נלווה
    for (let img of beverageImages)
    {
        // בדיקה האם המזהה של מחלקת התמונה שווה לתמונה שנבחרה
        if (img.id == selectedBeverage)
        {
            // עדכון אופי הצגת תמונת המשקה שנבחר 
            img.classList.add('selected');
        }
        else
        {
            // עדכון אופי הצגת תמונת המשקאות שלא נבחרו
            img.classList.remove('selected');
        }
    }

    // קריאה לפונקציה העדכון שלנו בכדי לראות האם המשתמש יכול לשלוח הזמנה
    validateForm();
}

function showConfirmation()
/*
פונקציה זו תקרא לאחר שליחת ההזמנה.
מטרתה היא להציג את סיכום ההזמנה למשתמש.
*/
{
    // שמירת הערכים מהטופס למשתנים
    var textInput = document.getElementById('textInput').value; //יכיל מחרוזת של קלט שם הלקוח
    var selectedToppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(function (checkbox) { return checkbox.parentElement.textContent.trim(); }); //הסבר על הפקודה במסמך נלווה - יכיל מערך של כל שמות התוספות כפי שהוצגו בטופס - בעברית
    var selectedBeverage = document.querySelector('input[name="beverages"]:checked').parentElement.textContent.trim(); //הסבר על הפקודה במסמך נלווה - יכיל מערך של כל שמות במשקאות כפי שהוצגו בטופס - בעברית

    // בדיקה האם המשתמש בחר תוספות
    if (selectedToppings.length > 0)
    {
        // שרשור מותאם למשתמש שבחר פיצה עם תוספות
        var summaryText = textInput + " קיבלנו את ההזמנה שלך! \n בחרת את התוספות הבאות לפיצה שלך: " + selectedToppings.join(', ') + ".\n ואת השתייה הבאה: " + selectedBeverage + ". \n תודה ונשמח לראותכם שוב!";
    }
    else
    {
        // שרשור מותאם למשתמש שבחר פיצה ללא תוספות
        var summaryText = textInput + " קיבלנו את ההזמנה שלך! \n בחרת פיצה ללא תוספות, השתייה שבחרת היא: " + selectedBeverage + ". \n תודה ונשמח לראותכם שוב!";
    }

    // שמירת השרשור להדפסה
    document.getElementById('orderSummaryText').innerText = summaryText;

    // עדכון להצגת הסיכום
    document.getElementById('orderSummaryModal').style.display = 'block';

}

function closeModal()
/*
פונקציה זו נקראת כאשר סוגרים את סיכום ההזמנה 
*/
{
    // עדכון לסגירת הסיכום
    document.getElementById('orderSummaryModal').style.display = 'none';
}