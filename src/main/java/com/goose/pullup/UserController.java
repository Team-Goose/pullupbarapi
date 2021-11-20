package com.goose.pullup;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.goose.pullup.UserEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    @PostMapping("/createuser")
    public ResponseEntity<Long> CreateUser(@RequestBody UserEntity user){
        String insertQuery = "INSERT INTO users (username, score) VALUES (?, ?)";
        try {
            Class.forName("org.postgresql.Driver");
            try (Connection conn = dbConnect();
                 PreparedStatement pstmt = conn.prepareStatement(insertQuery,
                         Statement.RETURN_GENERATED_KEYS)) {
                //insert post info into query
                pstmt.setString(1, user.getUsername());
                pstmt.setLong(2, user.getScore());
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        } catch(Exception e){
            System.out.println(e.getMessage());
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

}
