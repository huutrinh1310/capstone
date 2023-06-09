package com.elite_brain.elite_brain_be.model.dto;

import lombok.Data;

@Data
public class ChoiceDTO {

    private String content;

    private boolean correct;

    private String explain;
}
