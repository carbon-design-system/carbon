
<!-- different form inputs will look differently -->

<!-- different kinds of html5 input fields -->
#Input Elements

1. Input
2. Textarea
3. Select
4. ...

##Input

###HTML4 types
1. input type=button
1. input type=checkbox
1. input type=date
1. input type=email
1. input type=file
1. input type=hidden
1. input type=image
1. input type=month
1. input type=number
1. input type=password
1. input type=radio
1. input type=range
1. input type=reset
1. input type=search
1. input type=submit
1. input type=tel
1. input type=text
1. input type=url
1. input type=week

###HTML5 types

1. search
2. email
3. url
4. tel
5. number
6. range
7. date
8. month
9. week
10. time
11. datetime
12. datetime-local
13. color

###Input markup

Default input style, used for any default text style like name, address ...

```
	<input type="text" class="bx-input"></input>
```

Always specify a type that match the content, when specific style and interaction are needed, add --modifier in the classname.

```
	<input type="email" class="bx-input"></input>
	
	<input type="password" class="bx-input"></input>

	<input type="number" class="bx-input--currency"></input>

	<input type="number" class="bx-input--ccnumber"></input>
```

##Textarea

```
	<h3>Textareas</h3>
	<!-- use rows to specify height, not use cols to specify height, instead, use height -->
	<textarea class="bx-textarea" name="" id="" rows="10"></textarea>

	<!-- fluid modifier for flexible textarea -->
	<textarea class="bx-textarea--fluid" name="" id="" rows="10"></textarea>

```

##Form and input groups

```
	<form class="bx-form" action="">
    
	    <fieldset class="bx-input-group">
        	<label class="bx-input-label" for="someInputId"></label>
    	    <input class="bx-input" id="someInputId" type="text" />
    
	        <label class="bx-input-label" for="someInputEmail"></label>
        	<input class="bx-input--email" id="someInputEmail" type="email" />        
    	</fieldset>
    
	    <fieldset class="bx-input-group">
    	    <label class="bx-input-label" for="someInput"></label>
	        <input class="bx-input" id="someInput" type="text" />
    
        	<label class="bx-input-label" for="someSSHKey"></label>
    	    <textarea class="bx-textarea--fluid" name="" id="someSSHKey" rows="10"></textarea>
	    </fieldset>
    
	</form>

```

