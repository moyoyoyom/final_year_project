package com.project.final_year_project.model.java;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "FoodTriggers")
public class FoodTrigger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodTriggerID;

    @Column(nullable = false)
    private String triggerName;

    @Column(nullable = true)
    private Integer foodGroupID;
}
