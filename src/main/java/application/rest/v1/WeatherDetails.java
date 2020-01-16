package application.rest.v1;


import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


@Path("getWeather")
public class WeatherDetails {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response weather(@QueryParam("lat") double lat, @QueryParam("lon") double lon) {
    	
    	JSONParser parse = new JSONParser();
    	JSONObject jobj;
    	
    	System.out.println("Lat = " + lat +  " Lon = " + lon);
        
    	String apikey = "2276454694917418ea5bacdffa49e101";
		String inline = "";
		
		try {
			URL url = new URL("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apikey);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			
			conn.connect();
			int responseCode = conn.getResponseCode();
			if (responseCode != 200) {
				throw new RuntimeException("HTTP Response Code : "+ responseCode);
			} else {
				Scanner sc = new Scanner(url.openStream());
				while(sc.hasNext()) {
					inline += sc.nextLine();
				}
				System.out.println("\n String DATA: \n");
				System.out.println(inline);
				sc.close();
				
				jobj = (JSONObject)parse.parse(inline);
				
				return Response.ok(jobj).header("Access-Control-Allow-Origin", "*").build();
				 
			}
		} catch (MalformedURLException e) {
			// Catch Block for URL Exception
			System.out.println("\n ***************** URL EXCEPTION ***************** \n");
			e.printStackTrace();
		} catch (IOException e) {
			// Catch Block for HTTP Connection
			System.out.println("\n ****************** HTTP CONNECTION EXCEPTION ****************** \n");
			e.printStackTrace();
		} catch (ParseException e) {
			// Catch Block for JSON Parser
			System.out.println("\n ***************** PARSER EXCEPTION ***************** \n");
			e.printStackTrace();
		}
    	
        //return Response.ok(list.toString()).build();
        return Response.ok("{error: 404 error}").build();
    }


}

