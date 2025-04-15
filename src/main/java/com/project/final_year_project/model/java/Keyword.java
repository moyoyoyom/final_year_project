package com.project.final_year_project.model.java;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "Keyword")
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer keywordID;

    @Column(unique = true)
    private String keywordText;

    @ManyToMany(mappedBy = "keywords")
    @JsonIgnore
    private List<FoodProduct> foodProducts;

    public Keyword(String keywordText) {
        this.keywordText = keywordText;
    }

    @JsonCreator
    public static Keyword fromString(String keywordText) {
        return new Keyword(keywordText);
    }
}
