define(["jquery", "qlik", "text!./css/style.css"],

function ($, qlik,cssContent) {

	//$('<link rel="stylesheet" type="text/css" href="/extensions/AeS_Reload_Button/style.css">').appendTo("head");
	$("<style>").html(cssContent).appendTo("head");

	var app;
	app = qlik.currApp(this);
	var doc;
	var fileName;
	var field_Name;
	var field_Values = [];
	var field_Value;
	var temp_FieldName;
	var temp1_FieldName;
	var temp_TimeOut;
    var id_Value;   
	var span_id_Value;	
	var tbl_id;
    var i = 0;
    var j = 0;
	temp_TimeOut=0;
	var timeOutFunction;
    return {
        definition: {
            type: "items",
            component: "accordion",
            items: {
                 settings: {
                    uses: "settings",					
                    items:
					{
						id_Name: {
							ref: "var_Field_Name",
							label: "Button Text",
							type: "string",
							defaultValue: "Reload"
						},
						id1_Name: {
							ref: "var_Field_Name_1",
							label: "Success message",
							type: "string",
							defaultValue: "File has been validated successfully."
						},
						id2_Name: {
							ref: "var_Field_Name_2",
							label: "Processing message",
							type: "string",
							defaultValue: "Please wait a moment, your file is validating..."
						}
					}
                }

            }
        },
        paint: function ($element, layout) {

			id_reload_Value=layout.qInfo.qId + "_my_Reload_button";
			
			span_id_Value=layout.qInfo.qId + "_mySpan_Reload_button";
			tbl_id=layout.qInfo.qId + "_automate_tbl_ID";
			loading_id=layout.qInfo.qId + "_loading_ID";

            var html =		"<table id='"+tbl_id+"' style='margin-left:10px;'>"+
								"<tr>"+
									"<td align='justify'>"+
										"<span  id='"+span_id_Value+"' >  "+											
											"<input class='btn btn-primary' type='button' id='"+id_reload_Value+"' value='"+layout.var_Field_Name+"' name='my_Reload_Button'   >"+
										"</span>"+
									"</td>"+									
								"</tr>"+
								"<tr>"+
									"<td align='justify'>"+
										"<span id='"+loading_id+"' style='display:none;margin-top:20px;'>"+
											layout.var_Field_Name_2+ 
											"<img src='/extensions/AeS_Reload_Button/gif-load.gif' width='32px' height='32px'/>"+
										"</span>"+
									"</td>"+
								"</tr>"+
							"</table>";
					
			
			

            var container = $("#qv-toolbar-container").html();
			
			
            $element.html(html);
         
			
			
            $("#"+id_reload_Value).click(
				function (event) {
					document.getElementById(loading_id).style.display = "block";
					// 2nd 0 is for partial reload or not
					app.doReload( 0, 0, false).then(function(e) {						
						if(e) {
							app.doSave();
							alert(layout.var_Field_Name_1);
						} else {
							alert("Something went wrong, try again later.");
						}
						
					});

					//   var x;
					// 	if (confirm("Are you want to start the reload process?") == true)
					// 	{ 							
					// 		app.doReload();
					// 	} 
				} // inbuild function
			); // click event
			
        }
    };

});
