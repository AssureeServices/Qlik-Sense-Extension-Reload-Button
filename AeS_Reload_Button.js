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
						textualMessages: {
							type: "items",
							label: "Textual Messages",
							items: {
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
								},
								id3_Name: {
									ref: "var_error_processing",
									label: "Error processing message",
									type: "string",
									defaultValue: "Error in the reload. Try again later!"
								}
							}
						},
						styleItens: {
							type: "items",
							label: "Style Configuration",
							items: {
								id4_Name: {
									ref: "var_color_button",
									component: "dropdown",
									label: "Button Color",
									type: "string",
									options: [
									{
										value: "btn-primary",
										label: "Primary"
									}, {
										value: "btn-secondary",
										label: "Secondary"
									}, {
										value: "btn-success",
										label: "Success"
									}, {
										value: "btn-danger",
										label: "Danger"
									}, {
										value: "btn-warning",
										label: "Warning"
									}, {
										value: "btn-info",
										label: "Info"
									}, {
										value: "btn-light",
										label: "Light"
									}, {
										value: "btn-dark",
										label: "Dark"
									}
									],
									defaultValue: "btn-primary"
								},
								id5_Name: {
									ref: "var_position_button",
									component: "dropdown",
									label: "Button Position",
									type: "string",
									options: [
									{
										value: "top-left",
										label: "Top Left"
									}, {
										value: "top-center",
										label: "Top Center"
									}, {
										value: "top-right",
										label: "Top Right"
									}, {
										value: "mid-left",
										label: "Middle Left"
									}, {
										value: "mid-center",
										label: "Middle Center"
									}, {
										value: "mid-right",
										label: "Middle Right"
									}, {
										value: "bot-left",
										label: "Bottom Left"
									}, {
										value: "bot-center",
										label: "Bottom Center"
									}, {
										value: "bot-right",
										label: "Bottom Right"
									}
									],
									defaultValue: "mid-center"
								}
							}
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

            var html =		"<div class='"+layout.var_position_button+"'>"+
								"<input class='btn "+layout.var_color_button+"' type='button' id='"+id_reload_Value+"' value='"+layout.var_Field_Name+"' name='my_Reload_Button'>"+
								"<div id='"+loading_id+"' style='display:none;position: absolute;background: #FFF;'>"+
									layout.var_Field_Name_2+ 
									"<img src='/extensions/AeS_Reload_Button/gif-load.gif' width='32px' height='32px'/>"+
								"</div>"+
							"</div>";

       //      var html2 =		"<table id='"+tbl_id+"' style='margin-left:10px;'>"+
							// 	"<tr>"+
							// 		"<td>"+
							// 			"<span  id='"+span_id_Value+"' class='container centered'>  "+
							// 				"<input class='btn btn-primary' type='button' id='"+id_reload_Value+"' value='"+layout.var_Field_Name+"' name='my_Reload_Button'   >"+
							// 			"</span>"+
							// 		"</td>"+									
							// 	"</tr>"+
							// 	"<tr>"+
							// 		"<td align='justify'>"+
							// 			"<span id='"+loading_id+"' style='display:none;margin-top:20px;'>"+
							// 				layout.var_Field_Name_2+ 
							// 				"<img src='/extensions/AeS_Reload_Button/gif-load.gif' width='32px' height='32px'/>"+
							// 			"</span>"+
							// 		"</td>"+
							// 	"</tr>"+
							// "</table>";
					
			
			

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
							alert(layout.var_error_processing);
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
