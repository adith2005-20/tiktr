// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TiktrTicket is ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 public ticketCounter;
    uint256 public eventCounter;
    uint256[] public eventIds; 

    struct Event {
        address creator;      
        uint256 ticketPrice;  // in wei
        string metadataURI;   
        uint256 maxTickets;   
        uint256 ticketsSold;  
    }

    /// @notice Mapping to store which event a given token belongs to.
    mapping(uint256 => uint256) public tokenEventId;

    mapping(uint256 => Event) public events;

    // --- NEW --- Mapping for event-specific guard addresses.
    // For each eventId, map guard addresses to an authorization flag.
    mapping(uint256 => mapping(address => bool)) public eventGuards;

    event EventCreated(
        uint256 indexed eventId, 
        address indexed creator, 
        uint256 ticketPrice, 
        string metadataURI,
        uint256 maxTickets
    );
    event TicketMinted(uint256 indexed eventId, uint256 tokenId, address indexed owner);
    event TicketBurned(uint256 indexed tokenId, address burnedBy);
    event GuardAuthorized(uint256 indexed eventId, address indexed guard, bool authorized);

    constructor() ERC721("TiktrTicket", "TIKTR") Ownable(msg.sender) {
        ticketCounter = 0;
        eventCounter = 0;
    }

    /// @notice Allows the event creator to authorize or revoke a guard for their event.
    /// @param eventId The event ID.
    /// @param guard The address to authorize.
    /// @param authorized True to authorize; false to revoke.
    function authorizeGuardForEvent(uint256 eventId, address guard, bool authorized) external {
        // Only the creator of the event can manage guards for that event.
        require(msg.sender == events[eventId].creator, "Not authorized");
        eventGuards[eventId][guard] = authorized;
        emit GuardAuthorized(eventId, guard, authorized);
    }

    /// @notice Creates a new event.
    /// @param metadataURI Off-chain URI containing event details.
    /// @param ticketPrice Price per ticket in wei.
    /// @param maxTickets Maximum number of tickets available.
    /// @return eventId The unique event identifier.
    function createEvent(
        string memory metadataURI,
        uint256 ticketPrice,
        uint256 maxTickets
    ) public returns (uint256) {
        uint256 eventId = eventCounter;
        events[eventId] = Event({
            creator: msg.sender,
            ticketPrice: ticketPrice,
            metadataURI: metadataURI,
            maxTickets: maxTickets,
            ticketsSold: 0
        });
        eventIds.push(eventId); 
        eventCounter++;

        emit EventCreated(eventId, msg.sender, ticketPrice, metadataURI, maxTickets);
        return eventId;
    }

    /// @notice Purchases a ticket for a given event.
    /// @param eventId The ID of the event.
    /// @param ticketTokenURI The token URI for the minted NFT ticket.
    /// @return tokenId The ID of the minted ticket NFT.
    function buyTicket(uint256 eventId, string memory ticketTokenURI) public payable returns (uint256) {
        Event storage ev = events[eventId];
        require(msg.value >= ev.ticketPrice, "Insufficient payment for ticket");
        require(ev.ticketsSold < ev.maxTickets, "Event sold out");

        uint256 tokenId = ticketCounter;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, ticketTokenURI);
        ticketCounter++;

        ev.ticketsSold++;
        tokenEventId[tokenId] = eventId;

        // Forward payment to event creator
        (bool sent, ) = ev.creator.call{ value: msg.value }("");
        require(sent, "Failed to forward payment");

        emit TicketMinted(eventId, tokenId, msg.sender);
        return tokenId;
    }

    /// @notice Allows the ticket owner to burn their ticket.
    /// @param tokenId The ticket ID to burn.
    function useTicket(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Only the ticket owner can use it");
        _burn(tokenId);
        emit TicketBurned(tokenId, msg.sender);
    }

    /// @notice Allows an event-specific authorized guard to burn a ticket.
    /// @param tokenId The ticket ID to burn.
    function burnTicketByGuard(uint256 tokenId) public {
        uint256 eventId = tokenEventId[tokenId];
        require(eventGuards[eventId][msg.sender], "Not authorized to burn tickets for this event");
        _burn(tokenId);
        emit TicketBurned(tokenId, msg.sender);
    }

    /// @notice Returns an array of all event IDs.
    function getAllEventIds() public view returns (uint256[] memory) {
        return eventIds;
    }

    // Override supportsInterface to resolve conflicts.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721URIStorage, ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Override tokenURI to resolve conflicts.
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721URIStorage, ERC721)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
