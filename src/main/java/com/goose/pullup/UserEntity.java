package com.goose.pullup;

public class UserEntity {

    String Username;
    Long Score;

    public UserEntity(String username, Long score){
        Username = username;
        Score = score;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }

    public Long getScore() {
        return Score;
    }

    public void setScore(Long score) {
        Score = score;
    }
}
