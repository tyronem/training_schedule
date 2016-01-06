var schedule = undefined;
$(function() {

	/* day_order: in this case my training schedules start on Monday. Adjust accordingly. */
	$.getJSON('training.json', {param1: 'value1'}, function(json, textStatus) {
			//console.log(textStatus);
			//console.log(json);
			schedule = json;
			var rd = moment(schedule.race_day, "YYYYMMDD");

			var sd = rd.clone();
			var weekdays = ['su', 'm', 't', 'w', 'th', 'f', 'sa'];
			var start = sd.subtract(schedule.weeks, 'weeks').calendar();
			var startDate = moment(sd, "MM/DD/YYYY");

			var today = moment().format("MMM D");

			days_adjust = weekdays.indexOf(schedule.day_order[0]); 
			for (var i = 0; i<days_adjust; i++) {
				startDate.add(1, 'day');
			}

			sticky_header = $("<div />", {    
				"text": "",
				"class": "header"
			});

			for (var i = 1; i < schedule.weeks + 1; i++) {
				var week_header = $("<div />", {    
					     "class": "week_header"
					});

				var week_text = $("<div />", {    
					     "text": "Week " + i,
					     "class": "week_txt"
					});

				week_header.append(week_text);

				var calendar_week = $("<div />", {    
				     "class": "calendar_week"
				});

				var weekly_mileage = 0;
				for (j = 0; j<7; j++) {
					var calendar_entry = $("<div />", {    
					     "class": "calendar_day"
					});

					var calendar_date = $("<div />", {    
					     "text": startDate.format('MMM D '),
					     "class": "date"
					});

					if (today === startDate.format('MMM D')) {
						calendar_entry.addClass("today");
					}

					calendar_entry.append(calendar_date);


					var line1 = $("<p />", {    
					     "text": schedule["week" + i][schedule.day_order[j]].distance,
					     "class": "line1"
					});
					
					weekly_mileage += schedule["week" + i][schedule.day_order[j]].distance;
					
					var line2 = $("<p />", {    
					     "text": schedule["week" + i][schedule.day_order[j]].type,
					     "class": "line2"
					});

					
					calendar_entry.append(line1);
					calendar_entry.append(line2);
					calendar_week.append(calendar_entry);

					startDate.add(1, 'day');
				}
				week_header.append(calendar_week);
				
				week_text.append("<p class='mileage'>" + weekly_mileage + " mi </p>");

				$("div#thing").append(week_header);



				//TODO: 
				/*
					7. Print CSS 
				*/
			}

			$(".week_txt").on("click", function() {
				$(this).siblings(".calendar_week").toggle();
				if ($(this).siblings(".calendar_week").is(":visible")) {
					$(this).siblings(".calendar_week").css("display", "flex");
				}
			});

			$(".calendar_day").on("click", function() {
				if ($(window).width() < 768) {
					$(this).find(".line2").toggle();
				}
			});
	});
});