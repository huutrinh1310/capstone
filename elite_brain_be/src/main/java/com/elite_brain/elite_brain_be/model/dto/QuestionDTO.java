package com.elite_brain.elite_brain_be.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class QuestionDTO {

    @NotBlank
    private String description;

    private String image;

    @NotBlank
    private String type;

    @NotBlank
    private List<ChoiceDTO> choiceDTOList;

    private Long topicId;
}
