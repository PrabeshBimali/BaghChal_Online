import React from "react";
import "./TutorialPage.css";
import HomePageLayout from "./HomePageLayout";

export default function Tutorialpage() {
  return (
    <HomePageLayout>
      <div className="tut_page">
        <div className="tut_content">
          <div className="main_heading">BaghChal</div>
          <div className="tut_body">
            Bagh Chal is one of the many variants of the tiger hunting board
            games played locally in South East Asia and the Indian subcontinent.
            This ancient Nepali game shares many resemblances to other
            traditional games like Komikan, Rimau, and Adugo in terms of board
            structure and player objectives. The strategic, two-player board
            game is played on a 5x5 grid. The pieces are positioned at the
            intersection of the lines where adjacent lines from the intersection
            define the legal moves for a piece.
          </div>
          <div className="tut_image1 tut_image">
            <img src="tut1.png" alt="WTF"></img>
          </div>
          <div className="second_heading">Game Rules</div>
          <div className="tut_body">
            The game completes in two phases:
            <div
              style={{ color: "#ccc", marginTop: "20px", fontSize: "15px" }}
              className="second_heading"
            >
              1. Goat Placement Phase
            </div>
            During the placement phase, twenty goats are placed one after the
            other in one of the empty slots on the board while tigers move
            around. Goats are not allowed to move until all goats have been
            placed.
            <div
              style={{ color: "#ccc", marginTop: "20px", fontSize: "15px" }}
              className="second_heading"
            >
              2. Goat Movement Phase
            </div>
            The movement phase continues with both players moving their
            corresponding pieces.
          </div>
          <div className="tut_image2 tut_image">
            <img src="tut2.png" alt="WTF"></img>
          </div>
          <div className="tut_body">
            Throughout the game, tigers also have a special Capture move, where
            they can jump over a goat along the grid lines to an empty slot,
            thereby removing the goat from the board.
          </div>
          <div className="tut_body">Before capture:</div>
          <figure className="tut_image2 tut_image">
            <img src="tut3.png" alt="WTF"></img>
          </figure>
          <div className="tut_body">After capture:</div>
          <figure className="tut_image2 tut_image">
            <img src="tut4.png" alt="WTF"></img>
          </figure>
          <div className="tut_body">
            This asymmetric game proceeds with tigers trying to capture goats
            and goats trying to trap tigers (without any legal moves). The game
            is over when either the tigers capture five goats or the goats have
            blocked the legal moves for all tigers. In some rare cases, tigers
            can also win by blocking all the legal moves for goats.
          </div>
          <figure className="tut_image2 tut_image">
            <img src="tut5.png" alt="WTF"></img>
          </figure>
          <div className="second_heading">Ambiguous Rules</div>
          <div className="tut_body">
            The game can fall into a cycle of repeating board positions during
            the gameplay. To deal with these perpetual move orders that goats
            can employ to defend themselves from being captured, some
            communities have introduced constraints that do not allow moves that
            revert the game position to one that has already occurred in the
            game.
          </div>
          <div className="tut_body">
            However, this restriction can sometimes prevent moves that are
            forced for bagh players or cause goats to make absurd sacrifices.
            The board positions are bound to reoccur in lengthy games where
            there have been no capture moves for a long time. Thus, declaring a
            winner on that basis is highly ambiguous. For this project, this
            rule has been overridden by the standard "draw by threefold
            repetition" rule, where the recurrence of the same board position
            for three times automatically leads to a draw. The rule is rational
            as the recurrence of board position implies that no progress is
            being made in the game.
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
}
